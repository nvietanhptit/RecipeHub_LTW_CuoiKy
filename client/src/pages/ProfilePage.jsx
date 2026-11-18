import useAuth from "../hooks/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold text-stone-800">Hồ sơ cá nhân</h1>
      <p className="mt-2 text-stone-600">
        {user.name} ({user.email})
      </p>
    </section>
  );
}
