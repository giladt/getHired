import { gql } from 'apollo-boost';

const GET_CANDIDATES_LIST_QL = gql `
  query {
    Candidates{
      _id
      first_name
      last_name
      short_title
      home_address{
        _id
        ref_id
        street
        house_no
        city
        state
        country
        postal_code
      }
    }
  }
`;

const GET_CANDIDATE_QL = gql `
  query($id: ID) {
    Candidate(id: $id) {
      _id
      first_name
      last_name
      short_title
      birth_date
      place_of_birth
      home_address{
        _id
        ref_id
        street
        house_no
        city
        state
        country
        postal_code
        coordinates{
          lat
          lng
        }  
      }
      Experience{
        _id
        ref_id
        employer_name
        employer_address{
          _id
          ref_id
          street
          house_no
          city
          state
          country
          postal_code
        }
        rolls{
          _id
          ref_id
          title
          start_date
          end_date
          tasks{
            description
          }
        }
      }

      Education{
        _id
        ref_id
        institution_name
        institution_type
        studies_subject
        degree_achived
        start_date
        graduation_date
        institution_address{
          _id
          ref_id
          street
          house_no
          city
          state
          country
          postal_code
        }
        documents
      }
      contact_details{
        _id
        type
        value
        is_default
      }
      Skills{
        _id
        ref_id
        name
        level
      }
      Languages{
        _id

        name
        level
      }
      Applications{
        _id
        ref_id
        employer_name
        employer_address{
          _id
          ref_id
          street
          house_no
          city
          state
          country
          postal_code
        }
        role_name
        roll_description
        contact_name
        website_url
        openning_url
        cover_letter
        status_log{
          _id
          ref_id
          date
          log_value
        }
      }
    }
  }
`;

const GET_CONTACT_DETAILS_QL = gql`
  query($id: ID){
    ContactDetails(id: $id){
      _id
      ref_id
      type
      value
      is_default
    }  
  }
`;

const GET_ADDRESS_QL = gql`
  query($id: ID){
    Addresses(id: $id){
      _id
      ref_id
      street
      house_no
      city
      state
      country
      postal_code
      coordinates{
        lat
        lng
      }
    }
  }
`;

const GET_EDUCATION_QL = gql`
  query($id: ID) {
    Educations(id: $id) {
      _id
      ref_id
      institution_name
      institution_type
      studies_subject
      degree_achived
      start_date
      graduation_date
      institution_address{
        _id
        ref_id
        street
        house_no
        city
        state
        country
        postal_code
        coordinates{
          lat
          lng
        }
      }
    }
  }
`;

const GET_EXPERIENCES_QL = gql`
  query($id: ID) {
    Experiences(id: $id) {
      _id
      ref_id
      employer_name
      employer_address{
        _id
        ref_id
        street
        house_no
        city
        state
        country
        postal_code
      }
    }

  }
`;

const GET_ROLLS_QL = gql`
  query($id: ID) {
    Rolls(id: $id) {
      _id
      ref_id
      title
      start_date
      end_date
    }
  }
`;

const GET_TASKS_QL = gql`
  query($id: ID) {
    Tasks(id: $id) {
      _id
      ref_id
      description
    }
  }
`;

const ADD_INFO = gql `
  mutation (
    $ref_id: ID,
    $type: String!,
    $value: String!,
    $is_default: Boolean!
  ){
    AddContactDetail(
      ref_id: $ref_id,
      type: $type,
      value: $value,
      is_default: $is_default
    ){
      ref_id
      type
      value
      is_default
    }
  }
`;

const ADD_ADDRESS = gql `
  mutation add_address(
    $ref_id: ID,
    $street: string,
    $house_no: string,
    $city: string,
    $state: string,
    $country: string,
    $postal_code: number
    ) {
    AddAddress(
      ref_id: $ref_id,
      street: $street,
      house_no: $house_no,
      city: $city,
      state: $state,
      country: $country,
      postal_code: $postal_code
    ){
      street
      house_no
      city
      state
      country
      postal_code
    }
  }
`;

const UPDATE_ADDRESS = gql `
  mutation update_address(
    $_id: ID!,
    $street: String!,
    $house_no: String!,
    $city: String!,
    $state: String!,
    $country: String!,
    $postal_code: Int!
    ) {
    UpdateAddress(
      _id: $_id,
      street: $street,
      house_no: $house_no,
      city: $city,
      state: $state,
      country: $country,
      postal_code: $postal_code
    ){
      street
      house_no
      city
      state
      country
      postal_code
    }
  }
`;

const UPDATE_SCALE = gql`
mutation update_scale(
  $table: String!,
  $_id: ID!,
  $name: String!,
  $level: Int!
) {
  UpdateScale(
    source: $table,
    _id: $_id,
    name: $name,
    level: $level
	){
    _id
    ref_id
    name
    level
	}
}`;

const ADD_SCALE = gql`
mutation add_scale(
  $table: String!,
  $ref_id: ID!,
  $name: String!,
  $level: Int!
) {
AddScale(
  source: $table,
  ref_id: $ref_id,
  name: $name,
  level: $level
){
    _id
    ref_id
    name
    level
  }
}`;

const DELETE_SCALE = gql`
mutation delete_scale(
  $table: String!,
  $_id: ID!
) {
  DeleteScale(
    source: $table,
    _id: $_id
  ){
    _id
    ref_id
    name
    level
  }
}`;

const UPDATE_EXPERIENCE =gql`
mutation UpdateExperience (
  $_id: ID!
){
	UpdateExperience(
    _id: $_id
    
  ) {
    ref_id
  }
}`;

export {
  GET_CANDIDATES_LIST_QL,
  GET_CANDIDATE_QL,
  GET_CONTACT_DETAILS_QL,
  GET_EDUCATION_QL,
  GET_EXPERIENCES_QL,
  GET_ADDRESS_QL,
  GET_ROLLS_QL,
  GET_TASKS_QL,

  ADD_ADDRESS,
  UPDATE_ADDRESS,

  UPDATE_SCALE,
  ADD_SCALE,
  DELETE_SCALE,

  UPDATE_EXPERIENCE,

  ADD_INFO
};
