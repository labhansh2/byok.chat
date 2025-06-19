import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <SignUp
          appearance={{
            elements: {
              // Card container
              card: "bg-[#0a0a0a] border border-[#27272a] shadow-2xl rounded-lg p-8",

              // Header
              headerTitle:
                "text-[#fafafa] text-2xl font-semibold text-center mb-2",
              headerSubtitle: "text-[#a1a1aa] text-center mb-6",

              // Social buttons
              socialButtonsBlockButton:
                "bg-[#fafafa] border border-[#e5e5e5] text-[#18181b] hover:bg-[#f5f5f5] transition-colors font-medium rounded-md mb-4 w-full py-3",
              socialButtonsBlockButtonText: "text-[#18181b] font-medium",

              // Divider
              dividerLine: "bg-[#27272a]",
              dividerText: "text-[#a1a1aa] text-sm",

              // Form elements
              formFieldLabel: "text-[#fafafa] text-sm font-medium mb-2 block",
              formFieldInput:
                "bg-[#18181b] border border-[#27272a] text-[#fafafa] placeholder:text-[#71717a] rounded-md px-3 py-3 w-full focus:outline-none focus:ring-2 focus:ring-[#fafafa] focus:border-transparent transition-colors",
              formButtonPrimary:
                "bg-[#fafafa] text-[#18181b] hover:bg-[#f5f5f5] font-medium py-3 px-4 rounded-md transition-colors w-full mt-4",

              // Footer
              footerActionText: "text-[#a1a1aa] text-sm text-center mt-6",
              footerActionLink:
                "text-[#fafafa] hover:text-[#f5f5f5] font-medium transition-colors",

              // Error states
              formFieldErrorText: "text-red-400 text-sm mt-1",
              alert:
                "bg-red-500/10 border border-red-500/20 text-red-400 rounded-md p-3 mb-4",
              alertText: "text-red-400",

              // Remove default spacing and styling
              main: "w-full",
              cardBox: "w-full",
              rootBox: "w-full",
            },
          }}
          redirectUrl="/chat"
          signInUrl="/sign-in"
        />
      </div>
    </div>
  );
}
