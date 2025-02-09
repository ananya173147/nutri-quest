import { useState } from "react";
import { getNutriPlan } from "@/api/gemini";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Profile() {
  const [profileData, setProfileData] = useState(() => {
    return JSON.parse(localStorage.getItem("profileData")) || {
      age: "",
      height: "",
      weight: "",
      sex: "",
      dietaryRestriction: "",
      allergies: [],
    };
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleAllergyChange = (allergy) => {
    setProfileData((prev) => {
      const updatedAllergies = prev.allergies.includes(allergy)
        ? prev.allergies.filter((a: any) => a !== allergy) // Remove if already selected
        : [...prev.allergies, allergy]; // Add if not selected
      return { ...prev, allergies: updatedAllergies };
    });
  };

  const handleSave = () => {
    localStorage.setItem("profileData", JSON.stringify(profileData));
    alert("Profile saved successfully!");
  };

  const handleLoad = () => {
    const savedData = JSON.parse(localStorage.getItem("profileData"));
    if (savedData) {
      setProfileData(savedData);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile</h1>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Age</label>
              <input
                type="number"
                name="age"
                value={profileData.age}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md"
                placeholder="Enter age"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={profileData.height}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md"
                placeholder="Enter height"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={profileData.weight}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md"
                placeholder="Enter weight"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Sex</label>
              <select
                name="sex"
                value={profileData.sex}
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-md"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dietary Restriction */}
      <Card>
        <CardHeader>
          <CardTitle>Dietary Restriction</CardTitle>
        </CardHeader>
        <CardContent>
          <select
            name="dietaryRestriction"
            value={profileData.dietaryRestriction}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md"
          >
            <option value="">Select</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Pescetarian">Pescetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Dairy-Free">Dairy-Free</option>
            <option value="Gluten-Free">Gluten-Free</option>
            <option value="Paleo">Paleo</option>
            <option value="Raw Food">Raw Food</option>
            <option value="Keto">Keto</option>
          </select>
        </CardContent>
      </Card>

      {/* Food Allergies (Multi-Select) */}
      <Card>
        <CardHeader>
          <CardTitle>Food Allergies</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-2">
          {["Milk", "Eggs", "Nuts", "Wheat", "Soy", "Seafood"].map((allergy) => (
            <label key={allergy} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={profileData.allergies.includes(allergy)}
                onChange={() => handleAllergyChange(allergy)}
                className="w-4 h-4"
              />
              <span>{allergy}</span>
            </label>
          ))}
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button onClick={handleSave}>Save Profile</Button>
        <Button variant="outline" onClick={handleLoad}>
          Load Profile
        </Button>
      </div>
    </div>
  );
}
