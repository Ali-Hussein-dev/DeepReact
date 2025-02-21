import type { CheckboxProps } from '@radix-ui/react-checkbox';
import type { SwitchProps } from '@radix-ui/react-switch';
import type { SeparatorProps } from '@radix-ui/react-separator';
import type { RadioGroupProps } from '@radix-ui/react-radio-group';
import type {
    ToggleGroupMultipleProps,
    ToggleGroupSingleProps,
} from '@radix-ui/react-toggle-group';
// import { SliderProps } from '@radix-ui/react-slider';

export type SelectOption = { value: string; label: string };
//------------------------------------------------------------
type SharedFormProps = {
    name: string;
    label?: string;
    description?: string;
    required?: boolean;
    static?: boolean;
};

type Input = {
    name: string;
    fieldType: 'Input';
} & React.InputHTMLAttributes<HTMLInputElement> &
    SharedFormProps;

type PasswordInput = {
    name: string;
    fieldType: 'Password';
    type: 'password';
} & React.InputHTMLAttributes<HTMLInputElement> &
    SharedFormProps;


type Textarea = {
    name: string;
    fieldType: 'Textarea';
} & React.TextareaHTMLAttributes<HTMLTextAreaElement> &
    SharedFormProps;

type Checkbox = {
    fieldType: 'Checkbox';
} & CheckboxProps &
    SharedFormProps;

type RadioGroup = {
    fieldType: 'RadioGroup';
    options: SelectOption[];
} & RadioGroupProps &
    SharedFormProps;
//------------------------------
type ToggleGroupBaseProps = {
    fieldType: 'ToggleGroup';
    options: SelectOption[];
};

type ToggleGroupSingle = ToggleGroupBaseProps &
    ToggleGroupSingleProps & {
        type: 'single';
    };

type ToggleGroupMultiple = ToggleGroupBaseProps &
    ToggleGroupMultipleProps & {
        type: 'multiple';
    };

type ToggleGroup = (ToggleGroupSingle | ToggleGroupMultiple) & SharedFormProps;
//------------------------------

type Switch = {
    fieldType: 'Switch';
} & SwitchProps &
    SharedFormProps;

// type Slider = {
//     fieldType: 'Slider';
// } & SliderProps &
//     SharedFormProps;

type Select = {
    fieldType: 'Select';
    /**
     * Options for the select field
     */
    options: SelectOption[];
    placeholder: string;
} & React.SelectHTMLAttributes<HTMLSelectElement> &
    SharedFormProps;

type MultiSelect = {
    fieldType: 'MultiSelect';
    /**
     * Options for the multiselect field
     */
    options: SelectOption[];
    placeholder: string;
} & React.InputHTMLAttributes<HTMLInputElement> &
    SharedFormProps;
type DatePicker = {
    fieldType: 'DatePicker';
} & React.InputHTMLAttributes<HTMLInputElement> &
    SharedFormProps;

type H1 = {
    fieldType: 'H1';
    /**
     * the name is used as a key to identify the field
     */
    name: string;
    content: string;
    static: true;
} & React.HTMLAttributes<HTMLHeadingElement>;
type H2 = {
    fieldType: 'H2';
    /**
     * the name is used as a key to identify the field
     */
    name: string;
    static: true;
    content: string;
} & React.HTMLAttributes<HTMLHeadingElement>;
type H3 = {
    fieldType: 'H3';
    /**
     * the name is used as a key to identify the field
     */
    name: string;
    static: true;
    content: string;
} & React.HTMLAttributes<HTMLHeadingElement>;
type Paragraph = {
    fieldType: 'P';
    /**
     * the name is used as a key to identify the field
     */
    name: string;
    static: true;
    content: string;
} & React.HTMLAttributes<HTMLParagraphElement>;

type Divider = {
    fieldType: 'Separator';
    /**
     * the name is used as a key to identify the field
     */
    name: string;
    static: true;
} & SeparatorProps;

/**
 * FormFieldType is a union type that represents all the possible form fields
 * that can be rendered in a form
 */
type FormFieldElement =
    | Textarea
    | Input
    | PasswordInput
    | Checkbox
    | RadioGroup
    | ToggleGroup
    | Switch
    | Select
    | MultiSelect
    // | Slider
    | DatePicker;

/**
 * StaticFormElement is a type that represents a static form element
* that is not editable by the user
*/
export type StaticFormElement = H1 | H2 | H3 | Paragraph | Divider;

export type FormElement = FormFieldElement | StaticFormElement;