const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  ref_id: Object,
  street: String,
  house_no: String,
  city: String,
  state: String,
  country: String,
  postal_code: Number,
  coordinates: Object
});

const contactSchema = new Schema({
  ref_id: !Object,
  type: !String,
  value: !String,
  is_default: Boolean
});

const educationSchema = new Schema({
  ref_id: !Object,
  institution_name: !String,
  institution_type: String,
  studies_subject: !String,
  degree_achived: !String,
  start_date: !Date,
  graduation_date: Date,
  documents: Array,
});

const experienceSchema = new Schema({
  ref_id: !Object,
  employer_name: !String,
  documents: Array
});

const rollSchema = new Schema({
  ref_id: Object,
  title: String,
  start_date: Date,
  end_date: Date
});

const taskSchema = new Schema({
  ref_id: Object,
  description: String
});

const levelSchema = new Schema({
  ref_id: !String,
  name: !String,
  level: !Number
});

const applicationSchema = new Schema({
  ref_id: Object,
  employer_name: String,
  role_name: String,
  roll_description: String,
  contact_name: String,
  website_url: String,
  openning_url: String,
  cover_letter: String
});

const statusSchema = new Schema({
  ref_id: Object,
  log_value: String,
  date: Date
});

const candidateSchema = new Schema({
  first_name: String,
  last_name:  String,
  short_title: String,
  birth_date: Date,
  place_of_birth: String,
  nationality: Array
  // home_address: addressSchema,
  // contact_details: contactSchema,
  // education: educationSchema,
  // experience: experienceSchema,
  // skills: levelSchema,
  // languages: levelSchema,
  // applications: applicationSchema
});

module.exports = {
  Candidate:    mongoose.model('Candidate', candidateSchema),
  Address:      mongoose.model('Address', addressSchema),
  Language:     mongoose.model('Language', levelSchema),
  Skill:        mongoose.model('Skill', levelSchema),
  Experience:   mongoose.model('Experience', experienceSchema),
  Roll:         mongoose.model('Roll', rollSchema),
  Task:         mongoose.model('Task', taskSchema),
  Application:  mongoose.model('Application', applicationSchema),
  StatusLog:    mongoose.model('StatusLog', statusSchema),
  Education:    mongoose.model('Education', educationSchema),
  Contact:      mongoose.model('Contact', contactSchema),
};