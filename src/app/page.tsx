"use client";

import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { Font, Image as PDFImage } from "@react-pdf/renderer";

import { initialFormData } from "./constants/FormFileds";
import FormHandler from "@components/FormHandler";
import dynamic from "next/dynamic";
import { useState } from "react";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

Font.register({
  family: "Arial",
  src: "https://fonts.gstatic.com/s/arial/v11/uU9PCr6Y8WV0pZK0I1GtGw.ttf",
});

interface KeyValueListProps {
  label: string;
  customStyles?: {
    label?: any;
  };
  data: Record<string, string | number>;
}

const KeyValueList = ({
  label,
  data,
  customStyles = {},
}: KeyValueListProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.subHeader}>{label}</Text>
      {Object.entries(data).map(([key, value]) => (
        <View style={styles.row} key={key}>
          <Text style={[styles.label, customStyles.label]}>{key}:</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
  },
  section: {
    marginBottom: 15,
    paddingBottom: 10,
  },
  header: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    color: "#333333",
  },
  subHeader: {
    fontSize: "8px",
    marginBottom: 10,
    fontWeight: "bold",
    color: "black",
  },
  row: {
    flexDirection: "row",
    marginBottom: 3,
    alignItems: "flex-start",
  },
  label: {
    fontSize: "8px",
    marginLeft: 16,

    fontWeight: "normal",
    marginRight: 5,
    width: "35%",
  },
  value: {
    fontSize: "8px",
    flex: 1,
    textAlign: "left",
  },
  jobDescription: {
    marginTop: 5,
    fontStyle: "italic",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 8,
  },

  mainHeaderContainer: {
    display: "flex",
    marginBottom: 5,
  },
  headerContents: { display: "flex", marginLeft: 5 },
  headerContentText: { fontSize: 15, color: "#343434" },
  headerLogo: {
    width: 100,
    height: 50,
  },

  headerSectionContainer: {
    padding: 4,
    marginTop: 10,
    display: "flex",
    marginBottom: 25,
    border: "1px solid #0000",
  },
  headerSectionTextStyle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#000000",
  },
});

const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

const CosDocument = ({ data }: any) => (
  <Document
    title={`CoS_${data.certificateNumber}_${data.familyName}`}
    author="UK Visas & Immigration (Generated)"
  >
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.mainHeaderContainer}>
        <PDFImage
          src={`${baseUrl}/resized-logo.jpeg`}
          style={styles.headerLogo}
        />
      </View>

      {/* Section Header */}
      <View style={styles.headerSectionContainer}>
        <Text style={styles.headerSectionTextStyle}>
          Certificate of Sponsorship Details
        </Text>
      </View>

      {/* Tier and Category Section */}
      <KeyValueList
        label="Tier and Category"
        data={{
          "Tier and Category": data.tierCategory,
        }}
      />

      {/* Certificate Status Section */}
      <KeyValueList
        label="Certificate of sponsorship status"
        data={{
          "Sponsor licence number": data.sponsorLicenceNumber,
          "Sponsor name": data.sponsorName,
          "Certificate number": data.certificateNumber,
          "Current certificate status": data.currentStatus,
          "Current certificate status date": data.statusDate,
          "Date assigned": data.dateAssigned,
          "Expiry date (use by):": data.expiryDate,
          "Sponsorship withdrawn:": data.sponsorshipWithdrawn,
          "Sponsor note": data.sponsorNote,
          "Migrant application status": "",
        }}
      />

      {/* Personal Information Section */}
      <KeyValueList
        label="Personal Information"
        data={{
          "Family name": data.familyName,
          "Given name(s)": data.givenNames,
          "Other names": "",
          Nationality: data.nationality,
          "Place of birth": data.placeOfBirth,
          "Country of birth": data.countryOfBirth,
          "Date of birth": data.dateOfBirth,
          Gender: data.gender,
          "Country of residence": data.countryOfResidence,
        }}
      />

      {/* Passport Section */}
      <KeyValueList
        label="Passport or Travel Document"
        data={{
          "Passport number": data.passportNumber,
          "Issue date": data.passportIssueDate,
          "Expiry date": data.passportExpiryDate,
          "Place of issue of passport": data.passportIssuePlace,
        }}
      />

      {/* Home Address Section */}
      <KeyValueList
        label="Current Home Address"
        data={{
          Address: data.homeAddress,
          "City or town": data.homeCity,
          "County, area district or province": data.homeProvince,
          Postcode: data.homePostcode,
          Country: data.homeCountry,
        }}
      />

      {/* Home Address Section */}
      <KeyValueList
        label="Identification numbers"
        data={{
          "UK ID card number": data.ukCardNumber,
          "UK National Insurance number": data.insuranceNumber,
          "National ID card number": data.nationalIDCardNumber,
          "Employee number": data.employeeNumber,
        }}
      />

      {/* Work Dates Section */}
      <KeyValueList
        label="Work Dates"
        data={{
          "Start date": data.workStartDate,
          "End date": data.workEndDate,
          "Does the migrant need to leave and re-enter the UK during the period of approval?":
            data.leaveReEnterRequired,
          "Total weekly hours of work": data.weeklyHours,
        }}
      />

      {/* Work Address Section */}
      <KeyValueList
        label="Main work address in the United Kingdom (mandatory for assignment)"
        data={{
          Address: data.workAddress,
          "City or town": data.workCity,
          "County, area district or province": data.workProvince,
          Postcode: data.workPostcode,
        }}
      />

      {/* Work Address Section */}
      <KeyValueList
        label="Other regular work addresses in the United Kingdom:"
        data={{}}
      />

      {/* Employment Details Section */}
      <KeyValueList
        label="Migrant's Employment"
        data={{
          "Job title": data.jobTitle,
          "Job type": data.jobTypeSOC,
          "Summary of job description": data.jobDescription,
          "New Entrant?": data.isNewEntrant,
          "Gross salary in pounds sterling (Skilled Worker only: excluding any allowances and guaranteed bonuses; all other routes: including any allowances and guaranteed bonuses)": `${data.grossSalary}`,
          "For each": "Year",
          "Tick to confirm if the job is on the current Immigration Salary List":
            data.onSalaryList,
          "Tick to confirm that the post is at the appropriate skill level as set out in the sponsor guidance":
            data.onSalaryList,
          "Tick to certify maintenance for migrant (and dependants, if applicable)":
            data.onSalaryList,
          "Does the worker require an Academic Technology Approval Scheme (ATAS) certificate for this role?":
            data.atasRequired,
        }}
        customStyles={customFlexStyle}
      />

      {/* PAYE Section */}
      <KeyValueList
        label="Migrant's Employment - PAYE"
        data={{
          "PAYE reference supplied?": data.payeReferenceSupplied,
          ...(data.payeReferenceSupplied === "Y" && {
            "PAYE reference number": data.payeReference,
          }),
        }}
        customStyles={customFlexStyle}
      />

      {/* PhD Section */}
      <KeyValueList
        label="Migrant's Employment - PhD"
        data={{
          "Is PhD Level qualification required for post?": data.phdRequired,
        }}
        customStyles={customFlexStyle}
      />

      {/* Footer */}
      {/* <Text style={styles.footer} fixed>
        Generated on {new Date().toLocaleDateString()} - Certificate Number:{" "}
        {data.certificateNumber}
      </Text> */}
    </Page>
  </Document>
);

function App() {
  const [formData, setFormData] = useState(initialFormData);

  const fileName = `CoS_${initialFormData.certificateNumber}_${initialFormData.familyName}.pdf`;

  return (
    <div className="p-8 font-sans">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">
        Certificate of Sponsorship PDF Generator
      </h1>

      <p className="mb-6 text-center text-white">
        Click the button below to download the Certificate of Sponsorship
        details as a PDF file.
      </p>
      <div className="flex justify-center">
        <PDFDownloadLink
          fileName={fileName}
          document={<CosDocument data={formData} />}
        >
          {({ blob, url, loading: pdfLoading, error }: any) => (
            <button
              className={`px-6 py-3 rounded-lg text-white font-semibold shadow-md transition duration-300 ease-in-out ${
                pdfLoading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={pdfLoading}
            >
              {pdfLoading ? "Generating PDF..." : "Download CoS PDF"}
            </button>
          )}
        </PDFDownloadLink>
      </div>
      <FormHandler formData={formData} setFormData={setFormData} />

      {/* <PDFViewer style={{ width: "100%", height: "1000px" }}>
        <CosDocument data={formData} />
      </PDFViewer> */}
    </div>
  );
}

export default App;

const customFlexStyle = {
  label: { flex: 1 },
};
