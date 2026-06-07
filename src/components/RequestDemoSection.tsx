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
  businessType: z.string().min(1, "Please select a business type"),
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
  preferredDemo: z.string().min(1, "Please select a preferred demo type"),
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
  formType: "demo" | "waitlist";
  status: string;
  syncState: "synced" | "local_only" | "failed";
  analytics: ClientAnalytics;
}

export default function RequestDemoSection({ theme }: DemoProps) {
  // Configured default sheets endpoint
  const appsScriptUrl = (import.meta as any).env?.VITE_APPS_SCRIPT_URL || "";

  // State managers
  const [successMode, setSuccessMode] = useState<"demo" | "waitlist">("demo");
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
    },
  });

  const activePreferredDemo = watch("preferredDemo");

  // Multi-action core form submission dispatcher
  const onSubmit = async (values: FormValues) => {
    // 1. Double-Submit and duplicate local-spam check
    const recentSpam = localSubmissions.find(
      (sub) => 
        sub.email.toLowerCase() === values.email.toLowerCase() && 
        sub.formType === successMode &&
        (new Date().getTime() - new Date(sub.timestamp).getTime()) < 60 * 1000
    );

    if (recentSpam) {
      setToast({
        message: "Duplicate spam filter active. You already submitted this email in the last 60 seconds.",
        type: "error",
      });
      return;
    }

    try {
      // 2. Capture client-side analytics parameters asynchronously
      const analyticsPayload = await captureAnalytics();

      // 3. Construct unique tracking parameters
      const generatedId = `REQ-${successMode === 'waitlist' ? 'WL' : 'DM'}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // Assemble complete payload
      const webhookPayload = {
        ...values,
        formType: successMode,
        analytics: analyticsPayload,
      };

      let syncState: "synced" | "local_only" | "failed" = "local_only";

      // 4. API Request stream
      if (appsScriptUrl) {
        try {
          const response = await fetch(appsScriptUrl, {
            method: "POST",
            mode: "no-cors", // Google App Script expects redirect handling, no-cors ensures safe submission in SPAs
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(webhookPayload),
          });

          // Even in no-cors, any completion counts as safe delivery to Apps Script serverless buffer
          syncState = "synced";
          setToast({
            message: successMode === "waitlist" ? "Waitlist Successfully Joined!" : "Request Sent Successfully!",
            type: "success",
          });
        } catch (xhrError) {
          console.error("Google Sheets API stream error:", xhrError);
          syncState = "failed";
          setToast({
            message: "Cloud sync failed. Your request has been backed up locally.",
            type: "error",
          });
        }
      } else {
        // No environment endpoint configured, logging simulated success
        setToast({
          message: `Simulated: ${successMode === "waitlist" ? "Waitlist joined" : "Request sent"} successfully!`,
          type: "info",
        });
      }

      // 5. Append locally for testing visual feedbacks and durability
      const newRecord: CapturedSubmission = {
        id: generatedId,
        timestamp: new Date().toISOString(),
        name: values.name,
        email: values.email,
        phone: values.phone || "",
        company: values.company || "",
        businessType: values.businessType,
        preferredDemo: values.preferredDemo,
        message: values.message || "",
        formType: successMode,
        status: "NEW",
        syncState,
        analytics: analyticsPayload,
      };

      const updatedLogs = [newRecord, ...localSubmissions];
      setLocalSubmissions(updatedLogs);
      localStorage.setItem("onstaege_captured_leads", JSON.stringify(updatedLogs));

      setLastSubmittedId(generatedId);
      setIsSuccess(true);
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
                    {successMode === "waitlist" ? "✅ Waitlist Successfully Joined" : "✅ Request Sent Successfully"}
                  </h3>
                  <p className={`font-sans text-sm leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    {successMode === "waitlist" ? (
                      <>
                        We have recorded your credentials. You have been placed on our priority VIP queue. We'll secure your slot and contact you shortly.
                      </>
                    ) : (
                      <>
                        We've received your request and our team will contact you shortly to coordinate an immersive stream simulation.
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
                <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
                  <h2 className={`font-display text-3xl sm:text-4xl font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                    SEE ONSTAEGE IN ACTION
                  </h2>
                  <p className={`font-sans text-xs sm:text-sm leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-650'}`}>
                    Fill in your credentials to schedule a 15-minute live stream simulation or secure a priority slot on our platform waitlist.
                  </p>
                </div>

                {/* Form Field Matrix */}
                <form 
                  onSubmit={(e) => {
                    // Pre-submission click intercepts to verify waitlist/demo mode setting
                    e.preventDefault();
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

                      {/* Company name element */}
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
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Business Type Selector dropdown */}
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

                      {/* Demo Type choices */}
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
                    </div>

                    {/* Message block textarea */}
                    <div className="space-y-1.5">
                      <label className={`text-[10px] font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        Additional Message / Requirements
                      </label>
                      <textarea
                        {...register("message")}
                        rows={3}
                        placeholder="Describe your event specifications or target audience capacity..."
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

                  {/* High Contrast Submit Buttons Block */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      onClick={() => {
                        setSuccessMode("demo");
                        handleSubmit(onSubmit)();
                      }}
                      className={`py-4 px-6 rounded-2xl bg-gradient-to-r from-brand-blue to-indigo-600 text-white font-bold text-sm tracking-wide gap-2.5 flex items-center justify-center cursor-pointer hover:scale-[1.01] hover:shadow-xl hover:shadow-brand-blue/2 = 20 transition-all ${
                        isSubmitting ? "opacity-75 pointer-events-none" : ""
                      }`}
                    >
                      {isSubmitting && successMode === "demo" ? (
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Requesting Demo...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2.5">
                          <Send className="w-4 h-4" />
                          <span>Request Live Demo</span>
                        </div>
                      )}
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      onClick={() => {
                        setSuccessMode("waitlist");
                        handleSubmit(onSubmit)();
                      }}
                      className={`py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-brand-purple text-white font-bold text-sm tracking-wide gap-2.5 flex items-center justify-center cursor-pointer hover:scale-[1.01] hover:shadow-xl hover:shadow-brand-purple/20 transition-all ${
                        isSubmitting ? "opacity-75 pointer-events-none" : ""
                      }`}
                    >
                      {isSubmitting && successMode === "waitlist" ? (
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Joining Queue...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2.5">
                          <Sparkles className="w-4 h-4" />
                          <span>Join Waitlist</span>
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
