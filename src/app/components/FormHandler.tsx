"use client";

import CustomInput from "./CustomInput";
import { fieldGroups } from "@constants/FormFileds";

interface FormData {
  formData: {
    [key: string]: string;
  };
  setFormData: any;
}

const toTitleCase = (str: string) =>
  str.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());

export default function FormHandler(props: FormData) {
  const { formData, setFormData } = props;

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md my-3">
      {fieldGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="mb-6">
          <h2 className="text-xl font-bold mb-3 border-b pb-1 text-black">
            {group.label}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {group.fields.map((fieldName) => (
              <CustomInput
                key={fieldName}
                name={fieldName}
                label={toTitleCase(fieldName)}
                placeholder={toTitleCase(fieldName)}
                value={formData[fieldName] || ""}
                onChange={(e) =>
                  setFormData((prev: any) => ({
                    ...prev,
                    [fieldName]: e.target.value,
                  }))
                }
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
