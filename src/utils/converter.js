export const PatientVariableConverter = (input) => {
  return {
    id: input.id,
    ic: input.ic,
    name: input.name,
    patientDemographics: {
      mRNNumber: input.patientDemographics.mRNNumber,
      dateOfBirth: input.patientDemographics.dateOfBirth,
      gender: input.patientDemographics.gender,
      race: input.patientDemographics.race,
      bMI: input.patientDemographics.bMI,
    },
    pastMedicalHistory: {
      hypertension: input.pastMedicalHistory.hypertension,
      ischaemicHeartDisease: input.pastMedicalHistory.ischaemicHeartDisease,
      heartFailure: input.pastMedicalHistory.heartFailure,
      cvaOrStroke: input.pastMedicalHistory.cvaOrStroke,
      copd: input.pastMedicalHistory.copd,
      iddm: input.pastMedicalHistory.iddm,
      niddm: input.pastMedicalHistory.niddm,
    },
    socialAndFamilyHistory: {
      isSmoker: input.socialAndFamilyHistory.isSmoker,
      alcoholConsumption: input.socialAndFamilyHistory.alcoholConsumption,
      familyCRCHistory: input.socialAndFamilyHistory.familyCRCHistory,
    },
    colonoscopyHistory: {
      priorColonoscopy: input.colonoscopyHistory.priorColonoscopy,
      noOfPriorColonoscopy: parseInt(
        input.colonoscopyHistory.noOfPriorColonoscopy
      ),
      isNormal: input.colonoscopyHistory.isNormal,
      abnormalities: input.colonoscopyHistory.abnormalities,
    },
    endoscopyReport: {
      date: input.endoscopyReport.date,
      qualityOfPreparation: input.endoscopyReport.qualityOfPreparation,
      locationOfPolyps: input.endoscopyReport.locationOfPolyps,
      noOfPolyps: input.endoscopyReport.noOfPolyps,
      sizeOfLargestPolyp: input.endoscopyReport.sizeOfLargestPolyp,
      polypectomyComplete: input.endoscopyReport.polypectomyComplete,
      piecemalResection: input.endoscopyReport.piecemalResection,
    },
    histologyReport: {
      polypType: input.histologyReport.polypType,
      sizeOfLargestPolyp: input.histologyReport.sizeOfLargestPolyp,
      villousArchitecture: input.histologyReport.villousArchitecture,
      highGradeDysplasia: input.histologyReport.highGradeDysplasia,
    },
  };
};
