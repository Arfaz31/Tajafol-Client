/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import {
  Camera,
  Pencil,
  X,
  Save,
  Loader2,
  Mail,
  Phone,
  MapPin,
  UserCircle2,
  Settings,
} from "lucide-react";
import { toast } from "sonner";
import { useGetmeQuery, useUpdateProfileMutation } from "@/redux/api/userApi";
import Image from "next/image";
import userImage from "@/assets/logo/man.png";
import ChangePasswordModal from "../_Component/ChangePassModal";

const ProfilePage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data, isLoading, error } = useGetmeQuery({});
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>("");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const profile = data?.data;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    emergencyContact: "",
    address: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || "",
        email: profile.email || "",
        contact: profile.contact || "",
        emergencyContact: profile.emergencyContact || "",
        address: profile.address || "",
      });
      setProfileImagePreview(profile.profileImage || "");
    }
  }, [profile]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const submitFormData = new FormData();
      submitFormData.append(
        "data",
        JSON.stringify({
          fullName: formData.fullName,
          emergencyContact: formData.emergencyContact,
          address: formData.address,
        })
      );

      if (profileImage) {
        submitFormData.append("image", profileImage);
      }

      const response = await updateProfile({
        formData: submitFormData,
      }).unwrap();

      if (response?.statusCode === 200) {
        toast.success(response?.message);
        setIsEditing(false);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 border-4 border-t-green-600 border-green-200 rounded-full animate-spin" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">
            Failed to load profile
          </div>
          <button
            onClick={() => window.location.reload()}
            className="text-green-600 hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Image */}
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white/80 shadow-xl overflow-hidden transition-transform group-hover:scale-105">
                <Image
                  src={
                    profileImagePreview || profile?.profileImage || userImage
                  }
                  alt={profile?.fullName}
                  fill
                  className="w-full h-full object-cover"
                />
              </div>
              {isEditing && (
                <label className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <Camera className="h-5 w-5 text-green-600" />
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>

            {/* Profile Info */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {profile?.fullName}
              </h1>
              <div className="text-lg">{profile?.email}</div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {!isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit Profile
                  </button>

                  <button
                    onClick={() => setIsPasswordModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>

                  <ChangePasswordModal
                    isOpen={isPasswordModalOpen}
                    onClose={() => setIsPasswordModalOpen(false)}
                  />
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    disabled={isUpdating}
                    className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-white/90 text-green-600 rounded-lg transition-colors"
                  >
                    {isUpdating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Info Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-700">
              <UserCircle2 className="h-5 w-5" />
              Basic Information
            </h2>
            <div className="space-y-4">
              {isEditing ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-100 cursor-not-allowed"
                      disabled
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <UserCircle2 className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Full Name</div>
                      <div>{profile?.fullName}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div>{profile?.email}</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Contact Info Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-700">
              <Phone className="h-5 w-5" />
              Contact Information
            </h2>
            <div className="space-y-4">
              {isEditing ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Number
                    </label>
                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-gray-100 cursor-not-allowed"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emergency Contact
                    </label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">
                        Contact Number
                      </div>
                      <div>{profile?.contact || "Not provided"}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">
                        Emergency Contact
                      </div>
                      <div>{profile?.emergencyContact || "Not provided"}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="text-sm text-gray-500">Address</div>
                      <div>{profile?.address || "Not provided"}</div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
