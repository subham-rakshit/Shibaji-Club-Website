import AOS from "aos";
import {
  Button,
  Label,
  Radio,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";
import React, { useEffect, useState } from "react";

const stateList = [
  {
    name: "Andhra Pradesh",
    value: "andhra pradesh",
  },
  {
    name: "Arunachal Pradesh",
    value: "arunachal pradesh",
  },
  {
    name: "Assam",
    value: "assam",
  },
  {
    name: "Bihar",
    value: "bihar",
  },
  {
    name: "Chhattisgarh",
    value: "chhattisgarh",
  },
  {
    name: "Goa",
    value: "goa",
  },
  {
    name: "Gujarat",
    value: "gujarat",
  },
  {
    name: "Haryana",
    value: "haryana",
  },
  {
    name: "Himachal Pradesh",
    value: "himachal Pradesh",
  },
  {
    name: "Jharkhand",
    value: "jharkhand",
  },
  {
    name: "Karnataka",
    value: "karnataka",
  },
  {
    name: "Kerala",
    value: "kerala",
  },
  {
    name: "Madhya Pradesh",
    value: "madhya pradesh",
  },
  {
    name: "Maharashtra",
    value: "maharashtra",
  },
  {
    name: "Manipur",
    value: "manipur",
  },
  {
    name: "Meghalaya",
    value: "meghalaya",
  },
  {
    name: "Mizoram",
    value: "mizoram",
  },
  {
    name: "Nagaland",
    value: "nagaland",
  },
  {
    name: "Odisha",
    value: "odisha",
  },
  {
    name: "Punjab",
    value: "punjab",
  },
  {
    name: "Rajasthan",
    value: "rajasthan",
  },
  {
    name: "Sikkim",
    value: "sikkim",
  },
  {
    name: "Tamil Nadu",
    value: "tamil nadu",
  },
  {
    name: "Telangana",
    value: "telangana",
  },
  {
    name: "Tripura",
    value: "tripura",
  },
  {
    name: "Uttar Pradesh",
    value: "uttar pradesh",
  },
  {
    name: "Uttarakhand",
    value: "uttarakhand",
  },
  {
    name: "West Bengal",
    value: "west bengal",
  },
  {
    name: "Andaman and Nicobar Islands",
    value: "andaman and nicobar islands",
  },
  {
    name: "Chandigarh",
    value: "chandigarh",
  },
  {
    name: "Dadra and Nagar Haveli and Daman and Diu",
    value: "dadra and nagar haveli and daman and diu",
  },
  {
    name: "Lakshadweep",
    value: "lakshadweep",
  },
  {
    name: "Delhi",
    value: "delhi",
  },
  {
    name: "Puducherry",
    value: "puducherry",
  },
  {
    name: "Jammu and Kashmir",
    value: "jammu and kashmir",
  },
  {
    name: "Ladakh",
    value: "ladakh",
  },
];

function Trials() {
  const [isOtherChecked, setIsOtherChecked] = useState(false);
  const [trialFormData, setTrialFormData] = useState({
    playerFirstName: "",
    playerLastName: "",
    playerDOB: "",
    playerGender: "",
    parentFirstName: "",
    parentLastName: "",
    parentEmail: "",
    parentPhoneNumber: "",
    playerStreetAddress: "",
    playerCity: "",
    playerState: "west bengal",
    playerPin: "",
    playerCountry: "india",
    playerExperience: "",
    playerPosition: "uncategorized",
    playerMedical: "",
    playerEmergencyContactName: "",
    playerEmergencyContactNumber: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(trialFormData);
  };

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);
  return (
    <div className="w-screen min-h-screen mt-[65px] lg:mt-[70px]">
      <div className="w-[95%] max-w-[900px] min-h-screen mx-auto my-5 font-[Inter]">
        <h1
          className="text-2xl lg:text-3xl font-bold lg:text-center"
          data-aos="zoom-in"
        >
          Football Trial Application Form
        </h1>
        <p
          className="text-sm font-normal mt-3 lg:text-center"
          data-aos="zoom-in"
        >
          We're excited to have you join our football trials! Please fill out
          this application form to register for the trials.
        </p>
        <hr
          className="border-[1px] my-8 border-gray-200 dark:border-gray-700"
          data-aos="zoom-in"
        />

        {/* Trial Form */}
        <form onSubmit={handleFormSubmit}>
          <h1 className="text-lg font-bold mb-8" data-aos="flip-right">
            Applicant Information
          </h1>
          {/* Full Name */}
          <div className="mb-5 lg:mb-10" data-aos="fade-right">
            <h1 className="text-sm font-medium my-3">Full Name</h1>
            <div className="flex items-center justify-between gap-2 sm:gap-5 lg:gap-10">
              <div className="flex flex-col gap-2 w-full">
                <TextInput
                  type="text"
                  id="trialFirstName"
                  className="text-sm"
                  value={trialFormData.playerFirstName}
                  onChange={(e) =>
                    setTrialFormData({
                      ...trialFormData,
                      playerFirstName: e.target.value,
                    })
                  }
                  required
                />
                <Label htmlFor="trialFirstName" className="text-[13px]">
                  First Name
                </Label>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <TextInput
                  type="text"
                  id="trialLastName"
                  className="text-sm"
                  value={trialFormData.playerLastName}
                  onChange={(e) =>
                    setTrialFormData({
                      ...trialFormData,
                      playerLastName: e.target.value,
                    })
                  }
                  required
                />
                <Label htmlFor="trialLastName" className="text-[13px]">
                  Last Name
                </Label>
              </div>
            </div>
          </div>
          {/* Date of Birth */}
          <div className="mb-5 lg:mb-10" data-aos="fade-left">
            <h1 className="text-sm font-medium my-3">Date of Birth</h1>
            <TextInput
              type="date"
              id="dob"
              className="w-[fit-content]"
              value={trialFormData.playerDOB}
              onChange={(e) =>
                setTrialFormData({
                  ...trialFormData,
                  playerDOB: e.target.value,
                })
              }
            />
            <Label htmlFor="dob" className="text-[13px]">
              Date
            </Label>
          </div>
          {/* Gender */}
          <div className="mb-5 lg:mb-10" data-aos="fade-right">
            <h1 className="text-sm font-medium my-3">Gender</h1>
            <div className="flex max-w-md flex-col gap-4">
              <div className="flex items-center gap-2">
                <Radio
                  id="genderMale"
                  name="male"
                  value="male"
                  className="cursor-pointer"
                  onChange={(e) => {
                    setTrialFormData({
                      ...trialFormData,
                      playerGender: e.target.value,
                    });
                    setIsOtherChecked(false);
                  }}
                  checked={setTrialFormData.playerGender === "male"}
                />
                <Label htmlFor="genderMale" className="text-[16px]">
                  Male
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="genderFemale"
                  name="female"
                  value="female"
                  className="cursor-pointer"
                  onChange={(e) => {
                    setTrialFormData({
                      ...trialFormData,
                      playerGender: e.target.value,
                    });
                    setIsOtherChecked(false);
                  }}
                  checked={setTrialFormData.playerGender === "female"}
                />
                <Label htmlFor="genderFemale" className="text-[16px]">
                  Female
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="genderOther"
                  name="other"
                  value="other"
                  className="cursor-pointer"
                  onChange={(e) => {
                    setIsOtherChecked(true);
                    setTrialFormData({
                      ...trialFormData,
                      playerGender: e.target.value,
                    });
                  }}
                  checked={setTrialFormData.playerGender === "other"}
                />
                <Label htmlFor="genderOther" className="text-[16px]">
                  Other
                </Label>
              </div>
              {isOtherChecked && (
                <TextInput
                  type="text"
                  placeholder="Please type another option here"
                  value={trialFormData.playerGender}
                  onChange={(e) =>
                    setTrialFormData({
                      ...trialFormData,
                      playerGender: e.target.value,
                    })
                  }
                />
              )}
            </div>
          </div>
          {/* Parent/Guardian's Full Name */}
          <div className="mb-5 lg:mb-10" data-aos="fade-left">
            <h1 className="text-sm font-medium my-3">
              Parent/Guardian's Full Name
            </h1>
            <div className="flex items-center justify-between gap-2 sm:gap-5 lg:gap-10">
              <div className="flex flex-col gap-2 w-full">
                <TextInput
                  type="text"
                  id="parentFirstName"
                  className="text-sm"
                  value={trialFormData.parentFirstName}
                  onChange={(e) =>
                    setTrialFormData({
                      ...trialFormData,
                      parentFirstName: e.target.value,
                    })
                  }
                  required
                />
                <Label htmlFor="parentFirstName" className="text-[13px]">
                  First Name
                </Label>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <TextInput
                  type="text"
                  id="parentLastName"
                  className="text-sm"
                  value={trialFormData.parentLastName}
                  onChange={(e) =>
                    setTrialFormData({
                      ...trialFormData,
                      parentLastName: e.target.value,
                    })
                  }
                  required
                />
                <Label htmlFor="parentLastName" className="text-[13px]">
                  Last Name
                </Label>
              </div>
            </div>
          </div>
          {/* Parent/Guardian's Email Address and Phone Number */}
          <div
            className="flex flex-col sm:flex-row items-center gap-5 lg:gap-10 mb-5 lg:mb-10"
            data-aos="fade-right"
          >
            {/* Parent/Guardian's Email Address */}
            <div className="w-full">
              <h1 className="text-sm font-medium my-3">
                Parent/Guardian's Email Address
              </h1>

              <div className="flex flex-col gap-2">
                <TextInput
                  type="email"
                  id="parentEmail"
                  className="text-sm"
                  value={trialFormData.parentEmail}
                  onChange={(e) =>
                    setTrialFormData({
                      ...trialFormData,
                      parentEmail: e.target.value,
                    })
                  }
                  required
                />
                <Label htmlFor="parentEmail" className="text-[13px]">
                  example@example.com
                </Label>
              </div>
            </div>
            {/* Parent/Guardian's Phone Number */}
            <div className="w-full">
              <h1 className="text-sm font-medium my-3">
                Parent/Guardian's Phone Number
              </h1>

              <div className="flex flex-col gap-2">
                <TextInput
                  type="text"
                  id="parentPhoneNumber"
                  className="text-sm"
                  placeholder="+91 000-000-0000"
                  value={trialFormData.parentPhoneNumber}
                  onChange={(e) =>
                    setTrialFormData({
                      ...trialFormData,
                      parentPhoneNumber: e.target.value,
                    })
                  }
                  required
                />
                <Label htmlFor="parentPhoneNumber" className="text-[13px]">
                  Please enter a valid phone number.
                </Label>
              </div>
            </div>
          </div>
          {/* Address */}
          <div className="mb-5 lg:mb-10" data-aos="fade-left">
            <h1 className="text-sm font-medium my-3">Address</h1>
            {/* Address Line */}
            <div className="flex flex-col w-full gap-2">
              <TextInput
                type="text"
                id="playerAddress"
                className="text-sm"
                value={trialFormData.playerStreetAddress}
                onChange={(e) =>
                  setTrialFormData({
                    ...trialFormData,
                    playerStreetAddress: e.target.value,
                  })
                }
                required
              />
              <Label htmlFor="playerAddress" className="text-[13px]">
                Street Address
              </Label>
            </div>
            {/* City and State */}
            <div className="flex items-center gap-5 lg:gap-10 my-5">
              {/* City */}
              <div className="flex flex-col gap-2 w-full">
                <TextInput
                  type="text"
                  id="userCity"
                  className="text-sm"
                  value={trialFormData.playerCity}
                  onChange={(e) =>
                    setTrialFormData({
                      ...trialFormData,
                      playerCity: e.target.value,
                    })
                  }
                  required
                />
                <Label htmlFor="userCity" className="text-[13px]">
                  City
                </Label>
              </div>
              {/* State */}
              <div className="flex flex-col gap-2 w-full">
                <Select
                  id="states"
                  value={trialFormData.playerState}
                  onChange={(e) =>
                    setTrialFormData({
                      ...trialFormData,
                      playerState: e.target.value,
                    })
                  }
                  required
                >
                  {stateList.map((state) => (
                    <option value={state.value} key={state.value}>
                      {state.name}
                    </option>
                  ))}
                </Select>
                <Label htmlFor="states" className="text-[13px]">
                  State / Province
                </Label>
              </div>
            </div>
            {/* Postal and Country */}
            <div className="flex items-center gap-5 lg:gap-10 my-5">
              {/* Postal */}
              <div className="flex flex-col gap-2 w-full">
                <TextInput
                  type="text"
                  id="userPostal"
                  className="text-sm"
                  value={trialFormData.playerPin}
                  onChange={(e) =>
                    setTrialFormData({
                      ...trialFormData,
                      playerPin: e.target.value,
                    })
                  }
                  required
                />
                <Label htmlFor="userPostal" className="text-[13px]">
                  Postal / Zip Code
                </Label>
              </div>
              {/* State */}
              <div className="flex flex-col gap-2 w-full">
                <Select
                  id="country"
                  value={trialFormData.playerCountry}
                  onChange={(e) =>
                    setTrialFormData({
                      ...trialFormData,
                      playerCountry: e.target.value,
                    })
                  }
                  required
                >
                  <option value="india">India</option>
                  <option value="other">Other</option>
                </Select>
                <Label htmlFor="country" className="text-[13px]">
                  Country
                </Label>
              </div>
            </div>
          </div>

          <hr
            className="border-[1px] my-8 border-gray-200 dark:border-gray-700"
            data-aos="zoom-in"
          />
          {/* Football Experience */}
          <h1 className="text-lg font-bold mb-8" data-aos="flip-right">
            Football Experience
          </h1>
          {/* Years of Playing Experience & Preferred Playing Position*/}
          <div
            className="flex flex-col sm:flex-row items-center gap-5 lg:gap-10 mb-5 lg:mb-10"
            data-aos="fade-right"
          >
            {/* Years of Playing Experience */}
            <div className="w-full">
              <div className="flex flex-col gap-2">
                <Label htmlFor="experience" className="text-[16px]">
                  Years of Playing Experience
                </Label>
                <TextInput
                  type="text"
                  id="experience"
                  className="text-sm"
                  placeholder="e.g., 23"
                  value={trialFormData.playerExperience}
                  onChange={(e) =>
                    setTrialFormData({
                      ...trialFormData,
                      playerExperience: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>
            {/* Preferred Playing Position */}
            <div className="w-full">
              <div className="flex flex-col gap-2">
                <Label htmlFor="position" className="text-[16px]">
                  Preferred Playing Position
                </Label>
                <Select
                  id="position"
                  value={trialFormData.playerPosition}
                  onChange={(e) =>
                    setTrialFormData({
                      ...trialFormData,
                      playerPosition: e.target.value,
                    })
                  }
                  required
                >
                  <option value="uncategorized">Please Select</option>
                  <option value="goalkeeper">Goalkeeper</option>
                  <option value="midfielder">Midfielder</option>
                  <option value="forward">Forward</option>
                  <option value="defender">Defender</option>
                </Select>
              </div>
            </div>
          </div>
          {/* Medical Conditions / Injuries */}
          <div className="flex flex-col gap-2 mb-10" data-aos="fade-left">
            <Label htmlFor="medical" className="text-[16px]">
              Medical Conditions / Injuries
            </Label>
            <Textarea
              type="text"
              id="medical"
              className="text-sm"
              placeholder="If not then type - Fit"
              required
              rows={4}
              value={trialFormData.playerMedical}
              onChange={(e) =>
                setTrialFormData({
                  ...trialFormData,
                  playerMedical: e.target.value,
                })
              }
            />
          </div>

          <hr
            className="border-[1px] my-8 border-gray-200 dark:border-gray-700"
            data-aos="zoom-in"
          />
          {/* Emergency Contact Information */}
          <h1 className="text-lg font-bold mb-8" data-aos="flip-right">
            Emergency Contact Information
          </h1>
          {/* Emergency Contact Name & Phone Number */}
          <div className="flex items-center gap-5 lg:gap-10 mb-5 lg:mb-10">
            {/* Contact Name */}
            <div className="w-full" data-aos="fade-right">
              <h1 className="text-sm font-medium my-3">
                Emergency Contact Name
              </h1>

              <div className="flex flex-col gap-2">
                <TextInput
                  type="text"
                  id="emergencyContactName"
                  className="text-sm"
                  placeholder="Firstname Lastname"
                  value={trialFormData.playerEmergencyContactName}
                  onChange={(e) =>
                    setTrialFormData({
                      ...trialFormData,
                      playerEmergencyContactName: e.target.value,
                    })
                  }
                  required
                />
                <Label htmlFor="emergencyContactName" className="text-[13px]">
                  Please enter full name.
                </Label>
              </div>
            </div>
            {/* Phone Number */}
            <div className="w-full" data-aos="fade-left">
              <h1 className="text-sm font-medium my-3">
                Emergency Contact Phone Number
              </h1>

              <div className="flex flex-col gap-2">
                <TextInput
                  type="text"
                  id="emergencyPhoneNumber"
                  className="text-sm"
                  placeholder="+91 000-000-0000"
                  value={trialFormData.playerEmergencyContactNumber}
                  onChange={(e) =>
                    setTrialFormData({
                      ...trialFormData,
                      playerEmergencyContactNumber: e.target.value,
                    })
                  }
                  required
                />
                <Label htmlFor="emergencyPhoneNumber" className="text-[13px]">
                  Please enter a valid phone number.
                </Label>
              </div>
            </div>
          </div>

          <hr
            className="border-[1px] my-8 border-gray-200 dark:border-gray-700"
            data-aos="zoom-in"
          />
          {/* Submit Button */}
          <Button
            type="submit"
            gradientDuoTone="purpleToPink"
            outline
            pill
            className="mx-auto"
            data-aos="flip-left"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Trials;
