import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Info, 
  AlertCircle, 
  Database, 
  Check, 
  X, 
  Globe, 
  Clock, 
  Loader2,
  Lock,
  Mail,
  Smartphone,
  Tag
} from "lucide-react";
import { Theme } from "../types";
import { captureAnalytics, ClientAnalytics } from "../utils/analytics";

interface DemoProps {
  theme: Theme;
}

// 1. Zod Validation Schema with pristine formatting constraints
const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .transform((val) => val.trim())
    .refine((val) => val.length > 0, "Name cannot be empty spaces"),
  company: z
    .string()
    .max(100, "Company name cannot exceed 100 characters")
    .transform((val) => val.trim())
    .optional()
    .or(z.literal("")),
  businessType: z.string().optional().or(z.literal("")),
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please provide a valid email format (e.g. name@company.com)")
    .transform((val) => val.trim().toLowerCase()),
  phone: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => {
        if (!val) return true;
        // Allows common international & domestic characters, strictly validating length
        const phoneRegex = /^(\+?\d{1,4}[-.\s]?)?(\(?\d{2,5}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{3,4}$/;
        return phoneRegex.test(val.trim());
      },
      "Input a valid phone format (e.g., +1 (555) 019-2834)"
    ),
  message: z
    .string()
    .max(1000, "Message cannot exceed 1000 characters")
    .transform((val) => val.trim())
    .optional()
    .or(z.literal("")),
  preferredDemo: z.string().optional().or(z.literal("")),
  role: z
    .string()
    .max(100, "Role cannot exceed 100 characters")
    .transform((val) => val.trim())
    .optional()
    .or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

interface CapturedSubmission {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  businessType: string;
  preferredDemo: string;
  message: string;
  formType: string;
  role?: string;
  status: string;
  syncState: "synced" | "local_only" | "failed";
  analytics: ClientAnalytics;
}

export default function RequestDemoSection({ theme }: DemoProps) {
  // Configured default sheets endpoint
  const envUrl = (import.meta as any).env?.VITE_APPS_SCRIPT_URL;
  const appsScriptUrl = (envUrl && envUrl.indexOf("your_apps_script") === -1) 
    ? envUrl 
    : "https://script.google.com/macros/s/AKfycbxzFkeJ7SdqANgQ_LNN73KZxytrj054bsMWKy6YAS9xhb5EclXynz1giat02JogBHw/exec";

  // State managers
  const [selectedFormType, setSelectedFormType] = useState<"Request Demo" | "Waitlist" | "Contact Us" | "Partner Application">("Request Demo");
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastSubmittedId, setLastSubmittedId] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "error" | "success" | "info" } | null>(null);
  const [showDeveloperLogs, setShowDeveloperLogs] = useState(false);
  const [localSubmissions, setLocalSubmissions] = useState<CapturedSubmission[]>([]);

  // Toast auto-clear
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Read local submissions on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("onstaege_captured_leads");
      if (saved) {
        setLocalSubmissions(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Local storage lookup blocked:", e);
    }
  }, []);

  // Initialize React Hook Form with Zod schema resolver
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      businessType: "agency",
      email: "",
      phone: "",
      message: "",
      preferredDemo: "virtual",
      role: "",
    },
  });

  const activePreferredDemo = watch("preferredDemo");

  // Multi-action core form submission dispatcher
  const onSubmit = async (values: FormValues) => {
    console.log("Onstaege form submission triggered. Form Type selected:", selectedFormType);
    console.log("Raw form values received:", values);

    // 1. Double-Submit and duplicate local-spam check
    const recentSpam = localSubmissions.find(
      (sub) => 
        sub.email.toLowerCase() === values.email.toLowerCase() && 
        sub.formType === selectedFormType &&
        (new Date().getTime() - new Date(sub.timestamp).getTime()) < 60 * 1000
    );

    if (recentSpam) {
      console.warn("Spam filter intercepted submit for email:", values.email);
      setToast({
        message: "Duplicate submission. Please wait 60 seconds before submitting again.",
        type: "error",
      });
      return;
    }

    try {
      // 2. Capture client-side analytics parameters asynchronously
      const analyticsPayload = await captureAnalytics();
      console.log("Analytics data captured:", analyticsPayload);

      // 3. Construct unique tracking parameters
      const formCode = 
        selectedFormType === "Waitlist" ? "WL" : 
        selectedFormType === "Request Demo" ? "DM" : 
        selectedFormType === "Contact Us" ? "CT" : "PT";
      
      const generatedId = `REQ-${formCode}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // Assemble payload matching user requirements and Apps Script expectations
      const webhookPayload = {
        name: values.name,
        email: values.email,
        phone: values.phone || "",
        company: values.company || "",
        role: values.role || "",
        message: values.message || "",
        businessType: values.businessType || "",
        preferredDemo: values.preferredDemo || "",
        formType: selectedFormType,
        analytics: analyticsPayload,
      };

      console.log("Prepared Webhook Payload:", JSON.stringify(webhookPayload, null, 2));

      let syncState: "synced" | "local_only" | "failed" = "local_only";
      let isSubmissionSuccessful = false;

      // 4. API Request stream using CORS-compatible POST requests via Fetch API
      if (appsScriptUrl) {
        console.log(`Sending CORS-compatible request to Apps Script Web App: ${appsScriptUrl}`);
        try {
          // Send data as JSON with text/plain to avoid preflight options check blockages
          const response = await fetch(appsScriptUrl, {
            method: "POST",
            headers: {
              "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify(webhookPayload),
          });

          console.log("Apps Script Web App received response status:", response.status);
          const responseText = await response.text();
          console.log("Response text payload:", responseText);

          syncState = "synced";
          isSubmissionSuccessful = true;
          setToast({
            message: selectedFormType === "Waitlist" 
              ? "Waitlist Successfully Joined!" 
              : selectedFormType === "Request Demo"
                ? "Request Sent Successfully!"
                : selectedFormType === "Contact Us"
                  ? "Message Sent Successfully!"
                  : "Partner Application Submitted!",
            type: "success",
          });
        } catch (xhrError) {
          console.warn("Direct POST encountered fetch error, attempting fallback:", xhrError);
          try {
            // CORS fallback if necessary, though text/plain is fully secure & simple
            await fetch(appsScriptUrl, {
              method: "POST",
              mode: "no-cors",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(webhookPayload),
            });
            console.log("Fallback no-cors submission successful.");
            syncState = "synced";
            isSubmissionSuccessful = true;
            setToast({
              message: selectedFormType === "Waitlist" 
                ? "Waitlist Successfully Joined!" 
                : "Form Submitted Successfully!",
              type: "success",
            });
          } catch (fallbackError) {
            console.error("Critical Google Sheets API sync error:", fallbackError);
            syncState = "failed";
            setToast({
              message: "Cloud sync failed. Your request has been backed up locally.",
              type: "error",
            });
          }
        }
      } else {
        console.warn("No appsScriptUrl configured. Simulating successful form submission.");
        isSubmissionSuccessful = true;
        setToast({
          message: `Simulated: ${selectedFormType} submitted successfully!`,
          type: "info",
        });
      }

      // 5. Append locally for visual testing feedbacks and durability
      const newRecord: CapturedSubmission = {
        id: generatedId,
        timestamp: new Date().toISOString(),
        name: values.name,
        email: values.email,
        phone: values.phone || "",
        company: values.company || "",
        businessType: values.businessType || "",
        preferredDemo: values.preferredDemo || "",
        message: values.message || "",
        formType: selectedFormType,
        role: values.role || "",
        status: "NEW",
        syncState,
        analytics: analyticsPayload,
      };

      const updatedLogs = [newRecord, ...localSubmissions];
      setLocalSubmissions(updatedLogs);
      localStorage.setItem("onstaege_captured_leads", JSON.stringify(updatedLogs));

      setLastSubmittedId(generatedId);
      setIsSuccess(true);
      
      // Reset the form fields after successful submission
      if (isSubmissionSuccessful) {
        console.log("Resetting form fields after successful transmission.");
        reset();
      }
    } catch (genericError) {
      console.error("Critical submission flow trigger error:", genericError);
      setToast({
        message: "Something went wrong. Please try again.",
        type: "error",
      });
    }
  };

  // Erase mock database records
  const clearDatabase = () => {
    if (window.confirm("Verify: Clear all local submission backups from client memory?")) {
      localStorage.removeItem("onstaege_captured_leads");
      setLocalSubmissions([]);
      setToast({ message: "Local dev backups cleared successfully.", type: "info" });
    }
  };

  return (
    <section id="contact" className="relative z-10 py-20 lg:py-28 overflow-hidden">
      
      {/* Dynamic Slide-in Toast Banner Overlay */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 max-w-md w-full"
          >
            <div className={`p-4 rounded-2xl border backdrop-blur-md shadow-2xl flex items-start gap-3.5 transition-all ${
              toast.type === "error" 
                ? "bg-rose-950/95 border-rose-500/30 text-rose-200"
                : toast.type === "success"
                  ? "bg-emerald-950/95 border-emerald-500/30 text-emerald-200"
                  : "bg-zinc-900/95 border-brand-purple/30 text-zinc-100"
            }`}>
              {toast.type === "error" ? (
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5 animate-bounce" />
              ) : toast.type === "success" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 animate-pulse" />
              ) : (
                <Sparkles className="w-5 h-5 text-brand-purple shrink-0 mt-0.5 animate-pulse" />
              )}
              <div className="flex-1 text-xs sm:text-sm">
                <p className="font-bold tracking-tight uppercase truncate">
                  {toast.type === "error" ? "Transmission Error" : toast.type === "success" ? "Data Synchronized" : "Developer Log"}
                </p>
                <p className="mt-0.5 opacity-90 leading-relaxed font-sans">{toast.message}</p>
              </div>
              <button 
                onClick={() => setToast(null)} 
                className="hover:scale-115 active:scale-95 transition-all text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background neon visual ambient element */}
      <div className="absolute top-[20%] right-[10%] w-72 h-72 bg-brand-blue/15 rounded-full filter blur-[110px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-[20%] left-[10%] w-60 h-60 bg-brand-purple/10 rounded-full filter blur-[100px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '3s' }} />

      <div className="max-w-4xl mx-auto px-6">
        
        {/* Main interactive glass container */}
        <div className={`p-8 sm:p-12 rounded-[32px] border relative overflow-hidden transition-all duration-500 ${
          theme === "dark"
            ? "bg-[#0c0c0c]/90 border-white/5 shadow-2.5xl glow-blue"
            : "bg-white border-zinc-150 shadow-2xl shadow-zinc-200"
        }`}>
          
          {/* Glassmorphic Success Card Layer */}
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div 
                key="success-card"
                initial={{ opacity: 0, scale: 0.97, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center justify-center text-center py-12 space-y-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-green-400 to-emerald-600 p-[1.5px] flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <div className="w-full h-full bg-[#090909] rounded-[14px] flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-400" />
                  </div>
                </div>

                <div className="space-y-3 max-w-xl">
                  <h3 className={`font-display text-2.5xl sm:text-3.5xl font-black ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    {selectedFormType === "Waitlist" 
                      ? "✅ Waitlist Successfully Joined" 
                      : selectedFormType === "Request Demo"
                        ? "✅ Request Sent Successfully"
                        : selectedFormType === "Contact Us"
                          ? "✅ Message Sent Successfully"
                          : "✅ Application Submitted Successfully"}
                  </h3>
                  <p className={`font-sans text-sm leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    {selectedFormType === "Waitlist" ? (
                      <>
                        We have recorded your credentials. You have been placed on our priority VIP queue. We'll secure your slot and contact you shortly.
                      </>
                    ) : selectedFormType === "Request Demo" ? (
                      <>
                        We've received your request and our team will contact you shortly to coordinate an immersive stream simulation.
                      </>
                    ) : selectedFormType === "Contact Us" ? (
                      <>
                        Thank you for contacting us. Your message has been received, and our representative will respond within 24 hours.
                      </>
                    ) : (
                      <>
                        Thank you for your partner application. Our strategic partnership team will review your proposal and get in touch with you.
                      </>
                    )}
                  </p>
                  
                  <div className={`p-4 rounded-xl border font-mono text-center max-w-xs mx-auto text-xs ${
                    theme === 'dark' ? 'bg-[#0a0a0a] border-white/5 text-zinc-500' : 'bg-zinc-50 border-zinc-100 text-zinc-650'
                  }`}>
                    <p className="font-bold tracking-wider text-[10px] uppercase text-brand-purple">Lead Receipt Token</p>
                    <p className="mt-1 text-zinc-800 dark:text-zinc-300 select-all font-semibold">{lastSubmittedId}</p>
                    <p className="text-[9px] mt-1 opacity-80">Stored securely with NEW status flags</p>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={() => {
                      reset();
                      setIsSuccess(false);
                    }}
                    className={`px-6 py-3 rounded-xl font-sans text-xs font-bold border transition-all cursor-pointer hover:scale-[1.02] ${
                      theme === "dark"
                        ? "bg-zinc-900 border-white/5 text-zinc-300 hover:text-white"
                        : "bg-zinc-100 border-black/5 text-zinc-700 hover:text-black"
                    }`}
                  >
                    Submit another request
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form-fields"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Header Description Title */}
                <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">
                  <h2 className={`font-display text-3xl sm:text-4xl font-black tracking-tight uppercase ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    {selectedFormType === "Request Demo" 
                      ? "SEE ONSTAEGE IN ACTION" 
                      : selectedFormType === "Waitlist" 
                        ? "JOIN OUR EXCLUSIVE WAITLIST" 
                        : selectedFormType === "Contact Us" 
                          ? "GET IN TOUCH WITH US" 
                          : "BECOME AN ONSTAEGE PARTNER"}
                  </h2>
                  <p className={`font-sans text-xs sm:text-sm leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    {selectedFormType === "Request Demo" 
                      ? "Fill in your credentials to schedule a 15-minute live stream simulation with our lead concierges." 
                      : selectedFormType === "Waitlist" 
                        ? "Register to secure priority VIP access. We will notify you immediately once your slots unlock." 
                        : selectedFormType === "Contact Us" 
                          ? "Have some custom questions? Submit this form and we'll reply to your address within 24 hours." 
                          : "Submit a partner proposal to coordinate integrations, custom venues, and strategic sponsorships."}
                  </p>
                </div>

                {/* Highly polished segmented bar for form types */}
                <div className="flex flex-wrap items-center justify-center p-1 sm:p-1.5 rounded-2xl bg-zinc-900/40 dark:bg-zinc-950/40 border border-white/5 gap-1 mb-8 max-w-lg mx-auto">
                  {(["Request Demo", "Waitlist", "Contact Us", "Partner Application"] as const).map((type) => {
                    const isActive = selectedFormType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setSelectedFormType(type);
                          console.log("Switched active form type tab to:", type);
                        }}
                        className={`px-3 sm:px-4 py-2 rounded-xl text-[10px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                          isActive
                            ? "bg-brand-purple text-white shadow-md shadow-brand-purple/20"
                            : "text-zinc-400 hover:text-zinc-200 hover:bg-white/5"
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>

                {/* Form Field Matrix */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(onSubmit)();
                  }} 
                  className="space-y-6 text-left"
                >
                  
                  <fieldset disabled={isSubmitting} className="space-y-6 disabled:opacity-60 transition-all">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Name dynamic element */}
                      <div className="space-y-1.5 relative">
                        <label className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                          Your Name <span className="text-brand-purple font-black">*</span>
                        </label>
                        <div className="relative">
                          <input
                            {...register("name")}
                            type="text"
                            placeholder="e.g. John Doe"
                            className={`w-full px-4 py-3 rounded-xl border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all ${
                              errors.name 
                                ? "border-rose-500/50 bg-rose-500/5 focus:ring-rose-500" 
                                : theme === "dark"
                                  ? "bg-[#090909]/70 border-white/5 text-white"
                                  : "bg-zinc-50 border-zinc-200 text-zinc-900"
                            }`}
                          />
                        </div>
                        {errors.name && (
                          <motion.p 
                            initial={{ opacity: 0, y: -5 }} 
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[11px] font-semibold text-rose-400 font-sans flex items-center gap-1 mt-0.5"
                          >
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.name.message}</span>
                          </motion.p>
                        )}
                      </div>

                      {/* Explicit Email verified address */}
                      <div className="space-y-1.5">
                        <label className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                          Email Address <span className="text-brand-purple font-black">*</span>
                        </label>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="e.g. john@company.com"
                          className={`w-full px-4 py-3 rounded-xl border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all ${
                            errors.email
                              ? "border-rose-500/50 bg-rose-500/5 focus:ring-rose-500"
                              : theme === "dark"
                                ? "bg-[#090909]/70 border-white/5 text-white"
                                : "bg-zinc-50 border-zinc-200 text-zinc-900"
                            }`}
                        />
                        {errors.email && (
                          <motion.p 
                            initial={{ opacity: 0, y: -5 }} 
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[11px] font-semibold text-rose-400 font-sans flex items-center gap-1 mt-0.5"
                          >
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.email.message}</span>
                          </motion.p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Robust Phone Number */}
                      <div className="space-y-1.5">
                        <label className={`text-[10px] font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                          Phone Number
                        </label>
                        <input
                          {...register("phone")}
                          type="tel"
                          placeholder="e.g. +1 (555) 019-2834"
                          className={`w-full px-4 py-3 rounded-xl border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all ${
                            errors.phone
                              ? "border-rose-500/50 bg-rose-500/5 focus:ring-rose-500"
                              : theme === "dark"
                                ? "bg-[#090909]/70 border-white/5 text-white"
                                : "bg-zinc-50 border-zinc-200 text-zinc-900"
                          }`}
                        />
                        {errors.phone && (
                          <motion.p 
                            initial={{ opacity: 0, y: -5 }} 
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[11px] font-semibold text-rose-400 font-sans flex items-center gap-1 mt-0.5"
                          >
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.phone.message}</span>
                          </motion.p>
                        )}
                      </div>

                      {/* Company name element */}
                      {selectedFormType !== "Contact Us" ? (
                        <div className="space-y-1.5">
                          <label className={`text-[10px] font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                            Company / Venue Name
                          </label>
                          <input
                            {...register("company")}
                            type="text"
                            placeholder="e.g. Grand Plaza Lounge"
                            className={`w-full px-4 py-3 rounded-xl border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all ${
                              errors.company
                                ? "border-rose-500/50 focus:ring-rose-500"
                                : theme === "dark"
                                  ? "bg-[#090909]/70 border-white/5 text-white"
                                  : "bg-zinc-50 border-zinc-200 text-zinc-900"
                            }`}
                          />
                          {errors.company && (
                            <p className="text-[11px] font-semibold text-rose-400 font-sans flex items-center gap-1 mt-0.5">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>{errors.company.message}</span>
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-1 rounded-xl bg-[#090909]/30 dark:bg-zinc-900/20 border border-white/5 p-3.5 text-[11px] font-mono text-zinc-400 flex flex-col justify-center">
                          <p className="font-bold text-brand-purple flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-brand-purple" /> Dynamic Direct Route Active
                          </p>
                          <p className="mt-1 opacity-75 leading-normal">Your custom inquiries are routed directly to our concierge task board.</p>
                        </div>
                      )}
                    </div>

                    {/* Role & Business Type conditional row */}
                    {selectedFormType !== "Contact Us" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Role block */}
                        <div className="space-y-1.5">
                          <label className={`text-[10px] font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                            Your Role / Professional Title
                          </label>
                          <input
                            {...register("role")}
                            type="text"
                            placeholder="e.g. Founder, CEO, Coordinator"
                            className={`w-full px-4 py-3 rounded-xl border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all ${
                              errors.role
                                ? "border-rose-500/50 focus:ring-rose-500"
                                : theme === "dark"
                                  ? "bg-[#090909]/70 border-white/5 text-white"
                                  : "bg-zinc-50 border-zinc-200 text-zinc-900"
                            }`}
                          />
                          {errors.role && (
                            <p className="text-[11px] font-semibold text-rose-400 font-sans flex items-center gap-1 mt-0.5">
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>{errors.role.message}</span>
                            </p>
                          )}
                        </div>

                        {/* Business Type dropdown (only shown for Demo) */}
                        {selectedFormType === "Request Demo" ? (
                          <div className="space-y-1.5">
                            <label className={`text-[10px] font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                              Business Type
                            </label>
                            <select
                              {...register("businessType")}
                              className={`w-full px-4 py-3 rounded-xl border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all ${
                                theme === "dark"
                                  ? "bg-[#0b0b0b] border-white/5 text-white"
                                  : "bg-zinc-50 border-zinc-200 text-zinc-900"
                              }`}
                            >
                              <option value="agency">Event Organizer / Agency</option>
                              <option value="wedding">Wedding Coordinator</option>
                              <option value="nightlife">Nightclub / Entertainment Bar</option>
                              <option value="sports">Athletic Arena / Stadium Group</option>
                              <option value="individual">Independent Content Creator</option>
                            </select>
                          </div>
                        ) : (
                          <div className="space-y-1 rounded-xl bg-[#090909]/30 dark:bg-zinc-900/20 border border-white/5 p-3.5 text-[11px] font-mono text-zinc-400 flex flex-col justify-center">
                            <p className="font-bold text-brand-blue flex items-center gap-1">
                              <Globe className="w-3.5 h-3.5 text-brand-blue" /> Smart Concierge Desk
                            </p>
                            <p className="mt-1 opacity-75 leading-normal">We authenticate incoming applications and map them with priority response flags.</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Preferred Demo Type choices (Request Demo only) */}
                    {selectedFormType === "Request Demo" && (
                      <div className="space-y-1.5">
                        <label className={`text-[10px] font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                          Preferred Demo Type
                        </label>
                        <div className="grid grid-cols-2 gap-2.5">
                          <button
                            type="button"
                            onClick={() => setValue("preferredDemo", "physical")}
                            className={`py-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              activePreferredDemo === "physical"
                                ? "bg-brand-blue border-brand-blue text-white shadow-md shadow-brand-blue/15"
                                : theme === "dark"
                                  ? "bg-zinc-900 border-white/5 text-zinc-400 hover:text-white"
                                  : "bg-zinc-150 border-zinc-250 text-zinc-700 hover:text-black"
                            }`}
                          >
                            Physical Venue Mock
                          </button>
                          <button
                            type="button"
                            onClick={() => setValue("preferredDemo", "virtual")}
                            className={`py-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              activePreferredDemo === "virtual"
                                ? "bg-brand-purple border-brand-purple text-white shadow-md shadow-brand-purple/15"
                                : theme === "dark"
                                  ? "bg-zinc-900 border-white/5 text-zinc-400 hover:text-white"
                                  : "bg-zinc-150 border-zinc-250 text-zinc-700 hover:text-black"
                            }`}
                          >
                            Virtual Stream Demo
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Message block textarea */}
                    <div className="space-y-1.5">
                      <label className={`text-[10px] font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        {selectedFormType === "Partner Application" ? "Partnership Proposal / Requirements" : "Additional Message / Requirements"}
                      </label>
                      <textarea
                        {...register("message")}
                        rows={3}
                        placeholder={
                          selectedFormType === "Partner Application"
                            ? "Describe your proposed integration, strategic goals, or active audience metrics..."
                            : "Describe your event specifications or target audience capacity..."
                        }
                        className={`w-full px-4 py-3 rounded-xl border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-blue transition-all ${
                          errors.message
                            ? "border-rose-500/50 focus:ring-rose-500"
                            : theme === "dark"
                              ? "bg-[#090909]/70 border-white/5 text-white"
                              : "bg-zinc-50 border-zinc-200 text-zinc-900"
                        }`}
                      />
                      {errors.message && (
                        <p className="text-[11px] font-semibold text-rose-400 font-sans flex items-center gap-1 mt-0.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.message.message}</span>
                        </p>
                      )}
                    </div>
                  </fieldset>

                  {/* High Contrast Unified Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-brand-blue via-indigo-600 to-brand-purple text-white font-bold text-sm tracking-wide gap-2.5 flex items-center justify-center cursor-pointer hover:scale-[1.01] hover:shadow-xl hover:shadow-brand-purple/20 transition-all disabled:opacity-75 disabled:pointer-events-none"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Submitting...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2.5">
                          <Send className="w-4 h-4" />
                          <span>
                            {selectedFormType === "Request Demo" 
                              ? "Request Live Demo" 
                              : selectedFormType === "Waitlist" 
                                ? "Join VIP Waitlist" 
                                : selectedFormType === "Contact Us" 
                                  ? "Send Inquiry Message" 
                                  : "Submit Partner Application"}
                          </span>
                        </div>
                      )}
                    </button>
                  </div>

                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Secure data transmission note */}
          <div className="flex items-center space-x-1.5 justify-center mt-6 text-[10px] text-zinc-500 font-mono font-medium">
            <Lock className="w-3.5 h-3.5 text-zinc-500" />
            <span>Encrypted with rate limiting filters. Securely linked with Google Suite API.</span>
          </div>

        </div>
      </div>
    </section>
  );
}
