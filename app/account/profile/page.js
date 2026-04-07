import UpdateProfileForm from "@/app/_components/ui/profile/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getCountries, getGuest } from "@/app/_lib/data-service";
export const metadata = {
  title: "Update profile",
};

const Profile = async () => {
  const session = await auth();
  const user = await getGuest(session?.user?.email);
  const countries = await getCountries();

  console.log(user);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm countries={countries} guest={user} />
    </div>
  );
};

export default Profile;
