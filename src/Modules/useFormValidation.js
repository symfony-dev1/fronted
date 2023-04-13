import { reactive } from "@vue/reactivity";
const errors = reactive({});
export default function useFormValidation() {
    const validateNameField = (fieldName, fieldValue) => {
        errors[fieldName] = fieldValue === "" ? "The " + fieldName + " field is required" : "";
    }
    return { errors, validateNameField }
}