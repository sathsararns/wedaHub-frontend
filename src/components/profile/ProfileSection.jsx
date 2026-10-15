export default function ProfileSection({ icon: Icon, title, action, children }) {
  return (
    <div className="mb-6 sm:mb-8 rounded-3xl bg-white p-6 shadow-[0_20px_45px_-25px_rgba(91,52,196,0.35)] sm:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 sm:text-2xl">
          <Icon className="h-5 w-5 text-blue-600" />
          {title}
        </h2>

        {action}
      </div>

      {children}
    </div>
  );
}
