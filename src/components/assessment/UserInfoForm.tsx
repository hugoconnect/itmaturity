import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserInfo } from "@/types/assessment";
import { FormattedText } from '@/components/FormattedText';

interface UserInfoFormProps {
  onSubmit: (userInfo: UserInfo) => void;
  onBack: () => void;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({ onSubmit, onBack }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    company: "",
    email: "",
  });
  
  const [errors, setErrors] = useState({
    name: false,
    company: false,
    email: false,
  });

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    setErrors(prev => ({
      ...prev,
      [name]: false
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    const newErrors = {
      name: !userInfo.name.trim(),
      company: !userInfo.company.trim(),
      email: !validateEmail(userInfo.email),
    };

    setErrors(newErrors);

    // If no errors, submit
    if (!Object.values(newErrors).some(Boolean)) {
      onSubmit(userInfo);
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="heading-secondary mb-2">
          almost done!
        </h2>
        <p className="text-body">
          please provide your information to receive your personalized IT health check results.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">
            <FormattedText>name</FormattedText>
          </Label>
          <Input
            id="name"
            name="name"
            value={userInfo.name}
            onChange={handleChange}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              <FormattedText>please enter your name</FormattedText>
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="company">
            <FormattedText>company</FormattedText>
          </Label>
          <Input
            id="company"
            name="company"
            value={userInfo.company}
            onChange={handleChange}
            className={errors.company ? "border-red-500" : ""}
          />
          {errors.company && (
            <p className="text-red-500 text-sm mt-1">
              <FormattedText>please enter your company name</FormattedText>
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="email">
            <FormattedText>email</FormattedText>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={userInfo.email}
            onChange={handleChange}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              <FormattedText>please enter a valid email address</FormattedText>
            </p>
          )}
        </div>

        <div className="flex justify-between mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="border-hugo-anchor text-hugo-anchor hover:bg-hugo-anchor/10"
          >
            back
          </Button>

          <Button
            type="submit"
            variant="secondary"
            className="ml-auto"
          >
            submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserInfoForm;
