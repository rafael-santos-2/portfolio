import RHFAutocomplete from './autocomplete/rhf-autocomplete';
import RHFCheckboxMulti from './checkbox/multi/rhf-checkbox-multi';
import RHFCheckbox from './checkbox/rhf-checkbox';
import RHFDatePicker from './date-picker/rhf-date-picker';
import RHFTimePicker from './time-picker/rhf-time-picker';
import RHFPassword from './password/rhf-password';
import RHFTextField from './text-field/rhf-text-field';
import RHFUploadAvatar from './upload/avatar/rhf-upload-avatar';
import RHFDateTimePicker from './date-picker/date-time/rhf-date-time-picker';
import RHFRadioGroup from './radio-group/radio-group';
import RHFRating from './rating/rhf-rating';
import RHFSelect from './select/rhf-select';
import RHFMultiSelect from './select/multi/rhf-select-multi';
import RHFSlider from './slider/rhf-slider';
import RHFSwitch from './switch/rhf-switch';
import RHFMultiSwitch from './switch/multi/rhf-switch-multi';
import RHFUploadBox from './upload/box/rhf-upload-box';
import RHFUpload from './upload/rhf-upload';
import RHFEditor from './editor/rhf-editor';

// ----------------------------------------------------------------------

export const Field = {
  Autocomplete: RHFAutocomplete,
  CheckBox: RHFCheckbox,
  Date: RHFDatePicker,
  DateTime: RHFDateTimePicker,
  Editor: RHFEditor,
  MultiCheckbox: RHFCheckboxMulti,
  MultiSelect: RHFMultiSelect,
  MultiSwitch: RHFMultiSwitch,
  Password: RHFPassword,
  RadioGroup: RHFRadioGroup,
  Rating: RHFRating,
  Select: RHFSelect,
  Slider: RHFSlider,
  Switch: RHFSwitch,
  Text: RHFTextField,
  Time: RHFTimePicker,
  Upload: RHFUpload,
  UploadAvatar: RHFUploadAvatar,
  UploadBox: RHFUploadBox,
};
