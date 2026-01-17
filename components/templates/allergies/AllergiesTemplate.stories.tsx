import { AllergiesTemplate, mockAllergies } from "./AllergiesTemplate";

export const Default = () => <AllergiesTemplate allergies={mockAllergies} />;

export const EmptyState = () => <AllergiesTemplate allergies={[]} />;

export const WithOneAllergy = () => (
  <AllergiesTemplate allergies={[mockAllergies[0]]} />
);
