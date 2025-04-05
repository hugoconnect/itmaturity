
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserInfo } from "@/types/assessment";

interface UserInfoFormProps {
  onSubmit: (userInfo: UserInfo) => void;
  onBack: () => void;
}

const UserInfoForm = ({ onSubmit, onBack }: UserInfoFormProps) => {
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
    setUserInfo((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = {
      name: !userInfo.name.trim(),
      company: !userInfo.company.trim(),
      email: !userInfo.email.trim() || !validateEmail(userInfo.email),
    };
    
    setErrors(newErrors);
    
    // If no errors, submit
    if (!Object.values(newErrors).some(Boolean)) {
      onSubmit(userInfo);
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-primary mb-2">
          Almost Done!
        </h2>
        <p className="text-gray-600">
          Please provide your information to receive your personalized IT Maturity Assessment results.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="John Smith"
            value={userInfo.name}
            onChange={handleChange}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-sm text-red-500">Please enter your name</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company Name</Label>
          <Input
            id="company"
            name="company"
            placeholder="Acme Law Firm"
            value={userInfo.company}
            onChange={handleChange}
            className={errors.company ? "border-red-500" : ""}
          />
          {errors.company && (
            <p className="text-sm text-red-500">Please enter your company name</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={userInfo.email}
            onChange={handleChange}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-sm text-red-500">Please enter a valid email address</p>
          )}
        </div>

        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
          >
            Back
          </Button>
          <Button type="submit">
            View Results
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserInfoForm;
