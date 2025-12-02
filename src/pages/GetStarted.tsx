import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { UploadCloud, FileText, Image, ArrowRight } from "lucide-react";

const GetStarted = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [referenceFiles, setReferenceFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    projectTitle: "",
    projectType: "website",
    description: "",
    budget: "",
    timeframe: "",
  });

  const handleFilesChange = (files: FileList | null) => {
    if (!files) return;
    const selected = Array.from(files).slice(0, 5);
    setReferenceFiles(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const uploadedUrls: string[] = [];

      if (referenceFiles.length) {
        await Promise.all(
          referenceFiles.map(async (file) => {
            const path = `requests/${Date.now()}-${Math.random().toString(36).slice(2)}-${file.name}`;
            const { error: uploadError } = await supabase.storage.from("project-requests").upload(path, file);
            if (uploadError) throw uploadError;
            const { data: publicUrl } = supabase.storage.from("project-requests").getPublicUrl(path);
            if (publicUrl?.publicUrl) uploadedUrls.push(publicUrl.publicUrl);
          })
        );
      }

      const descriptionWithRefs = [
        `Type: ${formData.projectType}`,
        `Description: ${formData.description}`,
        `Budget: ${formData.budget || "N/A"}`,
        `Timeframe: ${formData.timeframe || "N/A"}`,
        uploadedUrls.length ? `Reference files: ${uploadedUrls.join(", ")}` : "",
      ]
        .filter(Boolean)
        .join("\n\n");

      const { error } = await supabase.from("project_requests").insert({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        project_title: formData.projectTitle,
        description: descriptionWithRefs,
        status: "new",
      });

      if (error) throw error;

      // Send notification email via Resend
      try {
        const { sendResendEmail } = await import("@/integrations/resend");
        await sendResendEmail({
          to: "zainabusal113@gmail.com",
          subject: "New Project Request Submitted",
          html: `
            <div style="background:#f8fafc;padding:32px 0;font-family:sans-serif;">
              <div style="max-width:480px;margin:0 auto;background:#fff;border-radius:12px;box-shadow:0 2px 8px #0001;padding:32px;">
                <div style="text-align:center;margin-bottom:24px;">
                  <img src='https://zdev-launchpad.vercel.app/favicon.ico' alt='zdev logo' style='width:48px;height:48px;border-radius:8px;margin-bottom:8px;' />
                  <h2 style="margin:0;font-size:1.5rem;color:#222;font-weight:700;">New Project Request</h2>
                </div>
                <div style="font-size:1rem;color:#333;line-height:1.6;">
                  <p><strong>Name:</strong> ${formData.fullName}</p>
                  <p><strong>Email:</strong> ${formData.email}</p>
                  <p><strong>Phone:</strong> ${formData.phone}</p>
                  <p><strong>Project Title:</strong> ${formData.projectTitle}</p>
                  <p><strong>Project Type:</strong> ${formData.projectType}</p>
                  <p><strong>Description:</strong><br/>${formData.description}</p>
                  <p><strong>Budget:</strong> ${formData.budget}</p>
                  <p><strong>Timeframe:</strong> ${formData.timeframe}</p>
                  ${
                    uploadedUrls.length
                      ? `<p><strong>Reference files:</strong><br/>${uploadedUrls
                          .map((url) => `<a href="${url}">${url}</a>`)
                          .join("<br/>")}</p>`
                      : ""
                  }
                </div>
                <div style="margin-top:32px;text-align:center;color:#888;font-size:0.9rem;">
                  <hr style="margin:24px 0;border:none;border-top:1px solid #eee;" />
                  <span>zdev - Freelance Web & Software Developer</span>
                </div>
              </div>
            </div>
          `,
        });
      } catch (err) {
        // Silently ignore email errors
      }

      toast({
        title: "Request submitted!",
        description: "I'll review your project and get back to you soon.",
      });

      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/70 py-16">
        <div className="absolute inset-0">
          <div className="absolute left-8 top-[-10%] h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute right-0 bottom-[-10%] h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container relative mx-auto px-4 text-center"
        >
          <p className="pill mx-auto w-fit">Kickoff form</p>
          <h1 className="mt-4 text-4xl font-bold text-foreground md:text-5xl">Start your project</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-foreground md:mx-auto">
            Share the goal, constraints, and references. Plans and files are saved securely to the project requests
            bucket.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 mx-auto mt-12 max-w-4xl px-4"
        >
          <Card className="surface-card border border-border/50 p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Your details</h2>
                    <p className="text-sm text-muted-foreground">
                      Who should I reach out to for kickoff and approvals?
                    </p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="fullName">Full name *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                        className="bg-secondary/70"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-secondary/70"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-secondary/70"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/50 bg-secondary/60 p-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <p className="text-sm font-semibold text-foreground">What to expect</p>
                  </div>
                  <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
                    <li>- I reply within 24-48h with timeline options.</li>
                    <li>- References you upload are stored in the project-requests bucket.</li>
                    <li>- A kickoff call and a first preview are typically scheduled in week one.</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Project details</h2>
                  <p className="text-sm text-muted-foreground">
                    Tell me what success looks like and any constraints I should factor in.
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="projectTitle">What do you want built? *</Label>
                    <Input
                      id="projectTitle"
                      placeholder="e.g., E-commerce website for my business"
                      value={formData.projectTitle}
                      onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                      required
                      className="bg-secondary/70"
                    />
                  </div>

                  <div>
                    <Label>Project type *</Label>
                    <RadioGroup
                      value={formData.projectType}
                      onValueChange={(value) => setFormData({ ...formData, projectType: value })}
                      className="mt-2 grid grid-cols-2 gap-3 md:grid-cols-4"
                    >
                      {[
                        { value: "website", label: "Website" },
                        { value: "system", label: "System" },
                        { value: "python", label: "Python" },
                        { value: "mixed", label: "Mixed" },
                      ].map((option) => (
                        <label
                          key={option.value}
                          htmlFor={option.value}
                          className="flex cursor-pointer items-center gap-2 rounded-xl border border-border/60 bg-secondary/60 px-3 py-2 text-sm font-medium text-foreground hover:border-primary/40"
                        >
                          <RadioGroupItem value={option.value} id={option.value} />
                          {option.label}
                        </label>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="budget">Budget</Label>
                      <Input
                        id="budget"
                        placeholder="e.g., $5,000 - $10,000"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="bg-secondary/70"
                      />
                    </div>

                    <div>
                      <Label htmlFor="timeframe">Timeframe</Label>
                      <Input
                        id="timeframe"
                        placeholder="e.g., 4 weeks, end of next month"
                        value={formData.timeframe}
                        onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                        className="bg-secondary/70"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Detailed description *</Label>
                    <Textarea
                      id="description"
                      rows={6}
                      placeholder="Describe the outcome you need, audiences, integrations, and any constraints."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      className="bg-secondary/70"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Reference uploads</h2>
                    <p className="text-sm text-muted-foreground">
                      Add screenshots, design references, or docs. Files are saved to the project-requests bucket.
                    </p>
                  </div>
                  <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
                    Optional
                  </Badge>
                </div>
                <label
                  htmlFor="references"
                  className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-primary/40 bg-secondary/60 p-6 text-center hover:border-primary/60"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <UploadCloud className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Upload references (images or PDFs)</p>
                    <p className="text-xs text-muted-foreground">Up to 5 files - PNG, JPG, PDF</p>
                  </div>
                  <Input
                    id="references"
                    type="file"
                    accept=".png,.jpg,.jpeg,.pdf"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFilesChange(e.target.files)}
                  />
                </label>
                {referenceFiles.length > 0 && (
                  <div className="rounded-2xl border border-border/50 bg-secondary/60 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Queued</p>
                    <div className="mt-2 space-y-2 text-sm text-foreground">
                      {referenceFiles.map((file) => (
                        <div key={file.name} className="flex items-center gap-2">
                          <Image className="h-4 w-4 text-primary" />
                          <span className="truncate">{file.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? "Submitting..." : "Submit request"}
                {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          </Card>
        </motion.div>
      </section>
    </PublicLayout>
  );
};

export default GetStarted;
