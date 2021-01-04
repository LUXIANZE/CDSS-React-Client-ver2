import { gql, useMutation } from "@apollo/client";
import client from "./GraphqlClient";

export const UPDATE_PATIENT = gql`
  mutation updatePatient($UpdatePatientInput: updatePatientInput!) {
    updatePatient(UpdatePatientInput: $UpdatePatientInput) {
      id
      ic
      mRNNumber
      name
      patientDemographics {
        mRNNumber
        dateOfBirth
        gender
        race
        bMI
      }
      pastMedicalHistory {
        hypertension
        ischaemicHeartDisease
        heartFailure
        cvaOrStroke
        copd
        iddm
        niddm
      }
      socialAndFamilyHistory {
        isSmoker
        alcoholConsumption
        familyCRCHistory
      }
      colonoscopyHistory {
        priorColonoscopy
        noOfPriorColonoscopy
        isNormal
        abnormalities
      }
      endoscopyReport {
        date
        qualityOfPreparation
        locationOfPolyps
        noOfPolyps
        sizeOfLargestPolyp
        polypectomyComplete
        piecemalResection
      }
      histologyReport {
        polypType
        sizeOfLargestPolyp
        villousArchitecture
        highGradeDysplasia
      }
    }
  }
`;

const UpdatePatient = (patientDetails) => {
  return useMutation(
    UPDATE_PATIENT,
    { variables: { UpdatePatientInput: patientDetails } },
    { client: client }
  );
};

export default UpdatePatient;
