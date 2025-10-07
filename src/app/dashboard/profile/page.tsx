import { LoginButton } from "@/components/Sidebar/Login/LoginButton";
import { WidgetItem } from "@/features/dashboard";
import { getServerAuthSession } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await getServerAuthSession();

  const isAuthenticated = !!session;

  const userSession = Object.entries(session?.user ?? {});

  return (
    <div className="flex flex-col">
      {!isAuthenticated && (
        <>
          <div className="mt-10 mb-4 text-2xl">
            Inicie sesión haciendo click en el botón ingresar para poder
            visualizar esta pantalla
          </div>

          <div className="*:text-2xl">
            <LoginButton isAuthenticated={isAuthenticated} />
          </div>
        </>
      )}

      {isAuthenticated && (
        <WidgetItem title="Usuario conectado (Server-side)">
          <div className="mt-8">
            {userSession.map(([key, value]) => {
              const displayValue = Array.isArray(value)
                ? value.join(", ")
                : value;
              return (
                <div key={key}>
                  <span className="font-medium">{key}:</span> {displayValue}
                </div>
              );
            })}
          </div>
        </WidgetItem>
      )}
    </div>
  );
}
