export type TQueryParam ={
  name: string;
  value:boolean | React.Key;

}
export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const monthOptions = monthNames.map((item) => ({
  value: item,
  label: item,
}));


export const genders = ['Male', 'Female', 'Other'];
export const genderOptions = genders.map((gender) => ({
  value: gender.toLowerCase(),
  label: gender,
}));

export const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const bloodGroupOptions = bloodGroups.map((groupName) => ({
  value: groupName,
  label: groupName,
}));

const weekdays = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
export const weekDaysOptions = weekdays.map((item) => ({
  value: item,
  label: item,
}));
