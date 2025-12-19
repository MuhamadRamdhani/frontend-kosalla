import Link from "next/link";
import { AuthGuard } from "@/components/AuthGuard";
import { me } from "@/lib/auth";
import type { User } from "@/types";

async function getAdminData() {
  try {
    const response = await me();
    return response?.user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}

export default async function AdminPage() {
  const user = await getAdminData();

  const externalSetupItems = [
    {
      title: "👥 Users",
      description: "Add/Edit user accounts",
      href: "/admin/users",
      icon: "👥",
    },
    {
      title: "🏢 Organization",
      description: "Setup organization",
      href: "/admin/organizations",
      icon: "🏢",
    },
    {
      title: "📍 Location",
      description: "Setup location",
      href: "/admin/locations",
      icon: "📍",
    },
    {
      title: "📦 Inventory",
      description: "Setup product type",
      href: "/admin/product-types",
      icon: "📦",
    },
    {
      title: "📋 Contracts",
      description: "Setup contracts",
      href: "/admin/contracts",
      icon: "📋",
    },
  ];

  const internalSetupItems = [
    {
      title: "🔧 Engineers",
      description: "Add virya engineer",
      href: "/admin/engineers",
      icon: "🔧",
    },
    {
      title: "👨‍💼 Team Groups",
      description: "Setup team group (DB, Apps, Integration, Infra)",
      href: "/admin/team-groups",
      icon: "👨‍💼",
    },
    {
      title: "👤 Team Members",
      description: "Setup team member + role",
      href: "/admin/team-members",
      icon: "👤",
    },
  ];

  const MenuCard = ({
    title,
    description,
    href,
    icon,
  }: {
    title: string;
    description: string;
    href: string;
    icon: string;
  }) => (
    <Link
      href={href}
      className="block bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 border-t-4 border-amber-500"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="text-slate-600 text-sm mt-2">{description}</p>
      <div className="mt-4 flex items-center text-amber-500 text-sm font-semibold">
        Go →
      </div>
    </Link>
  );

  return (
    <AuthGuard user={user} requiredRoles={["super-admin"]}>
      <div className="space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-600 mt-2">
            Welcome, {user?.name}! Manage Kosalla system from here.
          </p>
        </div>

        {/* Setup Eksternal */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              📤 Setup Eksternal (For External)
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Configure user accounts, organizations, locations, inventory, and contracts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {externalSetupItems.map((item) => (
              <MenuCard
                key={item.href}
                title={item.title}
                description={item.description}
                href={item.href}
                icon={item.icon}
              />
            ))}
          </div>
        </section>

        <hr className="border-slate-200" />

        {/* Setup Internal */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              ⚙️ Setup Internal (For Internal)
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Add engineers, setup team groups and assign team members with roles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {internalSetupItems.map((item) => (
              <MenuCard
                key={item.href}
                title={item.title}
                description={item.description}
                href={item.href}
                icon={item.icon}
              />
            ))}
          </div>
        </section>

        {/* Ticketing */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              🎫 Ticketing System
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              View and manage all tickets in the system
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MenuCard
              title="🎫 All Tickets"
              description="View and manage all tickets"
              href="/admin/tickets"
              icon="🎫"
            />
            <MenuCard
              title="📊 Ticket Reports"
              description="View ticket statistics and reports"
              href="/admin/tickets/reports"
              icon="📊"
            />
          </div>
        </section>
      </div>
    </AuthGuard>
  );
}

