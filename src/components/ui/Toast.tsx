"use client";

interface ToastProps {
  message: string;
}

/*
  Simple reusable toast component.

  App-er different action theke user-ke
  short success message dekhানোর jonno eta use korbo.
*/
export default function Toast({ message }: ToastProps) {
  return (
    <div
      role="status"
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 border border-[#ccff00] bg-[#ccff00] px-5 py-3 text-xs font-black uppercase tracking-[0.08em] text-black shadow-2xl"
    >
      {message}
    </div>
  );
}