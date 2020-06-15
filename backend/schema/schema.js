const graphql = require('graphql');
const _ = require('lodash');

const DataSchemas = require('../modules/DataSchemas');
const DATA = require('../modules/Data');

const {
    Candidate,
    Address,
    Language,
    Skill,
    Experience,
    Roll,
    Task,
    Application,
    StatusLog,
    Education,
    Contact
} = DataSchemas;

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLID,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLSchema
} = graphql;

const AddressType = new GraphQLObjectType({
    name: 'Address',
    fields: () => ({
        _id: { type: GraphQLID },
        ref_id: { type: GraphQLID },
        street: { type: GraphQLString },
        house_no: { type: GraphQLString },
        city: { type: GraphQLString },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
        postal_code: { type: GraphQLInt },
        coordinates: { 
            type: new GraphQLObjectType({
                name: 'Coordinates',
                fields: ()=> ({
                    lat: {type: GraphQLString},
                    lng: {type: GraphQLString}
                })
            })
        }
        //lat: { type: GraphQLString },
        //lng: { type: GraphQLString }
    })
});

const ContactDetailType = new GraphQLObjectType({
    name: 'ContactDetail',
    fields: () => ({
        _id: { type: GraphQLID },
        ref_id: { type: GraphQLID },
        type: { type: GraphQLString },
        value: { type: GraphQLString },
        is_default: { type: GraphQLBoolean }
    })
});

const EducationType = new GraphQLObjectType({
    name: 'Education',
    fields: () => ({
        _id: { type: GraphQLID },
        ref_id: { type: GraphQLID },
        institution_name: { type: GraphQLString },
        institution_type: { type: GraphQLString },
        studies_subject: { type: GraphQLString },
        degree_achived: { type: GraphQLString },
        start_date: { type: GraphQLString },
        graduation_date: { type: GraphQLString },

        institution_address: {
            type: AddressType,
            resolve: (parent) => {
                return Address.findOne({
                    'ref_id': parent.id
                });
            }
        },
        documents: { type: new GraphQLList(GraphQLString) }
    })
});

const ApplicationType = new GraphQLObjectType({
    name: 'Applications',
    fields: () => ({
        _id: { type: GraphQLID },
        ref_id: { type: GraphQLID },
        EmployerName: { type: GraphQLString },
        EmployerAddress: {
            type: AddressType,
            resolve: (parent) => {
                return Address.findOne({
                    'ref_id': parent.id
                });
            }
        },
        role_name: { type: GraphQLString },
        roll_description: { type: GraphQLString },
        contact_name: { type: GraphQLString },
        website_url: { type: GraphQLString },
        openning_url: { type: GraphQLString },

        cover_letter: { type: GraphQLString },
        status_log: {
            type: GraphQLList(StatusLogType),
            resolve: (parent) => {
                return StatusLog.find({
                    'ref_id': parent.id
                });
            }
        }
    })
});

const StatusLogType = new GraphQLObjectType({
    name: 'StatusLog',
    fields: () => ({
        _id: { type: GraphQLID },
        ref_id: { type: GraphQLID },
        log_value: { type: GraphQLString },
        date: { type: GraphQLString }
    })
});

const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
        _id: { type: GraphQLID },
        ref_id: { type: GraphQLID },
        description: { type: GraphQLString },
    })
});

const LevelType = new GraphQLObjectType({
    name: 'Level',
    fields: () => ({
        _id: { type: GraphQLID },
        ref_id: { type: GraphQLID },
        name: { type: GraphQLString },
        level: { type: GraphQLInt }
    })
});

const RollType = new GraphQLObjectType({
    name: 'Roll',
    fields: () => ({
        _id: { type: GraphQLID },
        ref_id: { type: GraphQLID },
        title: { type: GraphQLString },
        tasks: {
            type: new GraphQLList(TaskType),
            resolve: (parent) => {
                return Task.find({
                    'ref_id': parent.id
                });
            }
        },
        start_date: { type: GraphQLString },
        end_date: { type: GraphQLString }
    })
});

const ExperienceType = new GraphQLObjectType({
    name: 'Experience',
    fields: () => ({
        _id: { type: GraphQLID },
        ref_id: { type: GraphQLID },
        employer_name: { type: GraphQLString },
        employer_address: {
            type: AddressType,
            resolve: (parent) => {
                return Address.findOne({
                    'ref_id': parent.id
                });
            }
        },
        rolls: {
            type: new GraphQLList(RollType),
            resolve: (parent) => {
                return Roll.find({
                    'ref_id': parent.id
                });
            }
        },
        Documents: { type: new GraphQLList(GraphQLString) }
    })
});

const CandidateType = new GraphQLObjectType({
    name: 'Candidate',
    fields: () => ({
        _id: { type: GraphQLID },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        short_title: { type: GraphQLString },
        birth_date: { type: GraphQLString },
        place_of_birth: { type: GraphQLString },
        nationality: { type: new GraphQLList(GraphQLString) },

        home_address: {
            type: AddressType,
            resolve: (parent) => {
                return Address.findOne({
                    'ref_id': parent.id
                });
            }
        },
        contact_details: {
            type: new GraphQLList(ContactDetailType),
            resolve: (parent) => {
                return Contact.find({
                    'ref_id': parent.id
                });
            }
        },
        Education: {
            type: new GraphQLList(EducationType),
            resolve: (parent) => {
                return Education.find({
                    'ref_id': parent.id
                });
            }

        },
        Experience: {
            type: new GraphQLList(ExperienceType),
            resolve: (parent) => {
                return Experience.find({
                    'ref_id': parent.id
                });
            }
        },
        Skills: {
            type: GraphQLList(LevelType),
            resolve: (parent) => {
                return Skill.find({
                    'ref_id': parent.id
                });
            }
        },
        Languages: {
            type: GraphQLList(LevelType),
            resolve: (parent) => {
                return Language.find({
                    'ref_id': parent.id
                });
            }
        },
        Applications: {
            type: new GraphQLList(ApplicationType),
            resolve: (parent) => {
                return Application.find({
                    'ref_id': parent.id
                });
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        Candidates: {
            type: new GraphQLList(CandidateType),
            resolve: () => {
                return Candidate.find({});
            }
        },
        Candidate: {
            type: new GraphQLList(CandidateType),
            args: {
                id: { type: GraphQLID }
            },
            resolve: (parent, args) => {
                return Candidate.find({ '_id': args.id });
            }
        },
        /*
        Address: {
            type: Address,
            args: {
                id: { type: GraphQLID }
            },
            resolve: (parent, args) => {
                return Address.find({ '_id': args.id });
            }
        },
        */
        Applications: {
            type: new GraphQLList(ApplicationType),
            args: { id: { type: GraphQLID } },
            resolve: (parent, args) => {
                let personId = _.first(_.filter(DATA.CANDIDATE, ["ID", args.id])).ID;
                return _.filter(DATA.APPLICATIONS, ["RefId", personId]);
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        AddCandidate: {
            type: CandidateType,
            args: {
                first_name: { type: new GraphQLNonNull(GraphQLString) },
                last_name: { type: new GraphQLNonNull(GraphQLString) },
                short_title: { type: new GraphQLNonNull(GraphQLString) },
                birthdate: { type: new GraphQLNonNull(GraphQLString) },
                place_of_birth: { type: new GraphQLNonNull(GraphQLString) },
                nationality: { type: new GraphQLNonNull(GraphQLList(GraphQLString)) },
            },
            resolve: (parent, args) => {
                let candidate = new Candidate({
                    first_name: args.first_name,
                    last_name: args.last_name,
                    short_title: args.short_title,
                    birth_date: Date.parse(args.birthdate),
                    place_of_birth: args.place_of_birth,
                    nationality: [args.nationality]
                });
                return candidate.save();
            }
        },

        AddContactDetail: {
            type: ContactDetailType,
            args: {
                ref_id: { type: new GraphQLNonNull(GraphQLID) },
                type: { type: new GraphQLNonNull(GraphQLString) },
                value: { type: new GraphQLNonNull(GraphQLString) },
                is_default: { type: new GraphQLNonNull(GraphQLBoolean) },
            },
            resolve: (parent, args) => {
                let contact_detail = new Contact({
                    ref_id: args.ref_id,
                    type: args.type,
                    value: args.value,
                    is_default: args.is_default
                });
                return contact_detail.save();
            }
        },

        AddEducation: {
            type: EducationType,
            args: {

                ref_id: { type: new GraphQLNonNull(GraphQLID) },
                institution_name: { type: new GraphQLNonNull(GraphQLString) },
                institution_type: { type: new GraphQLNonNull(GraphQLString) },
                studies_subject: { type: new GraphQLNonNull(GraphQLString) },
                degree_achived: { type: new GraphQLNonNull(GraphQLString) },
                start_date: { type: new GraphQLNonNull(GraphQLString) },
                graduation_date: { type: GraphQLString },
                documents: { type: new GraphQLList(GraphQLString) }
                // institution_address
            },
            resolve: (parent, args) => {
                let education = new Education({
                    ref_id: args.ref_id,
                    institution_name: args.institution_name,
                    institution_type: args.institution_type,
                    studies_subject: args.studies_subject,
                    degree_achived: args.degree_achived,
                    start_date: args.start_date,
                    graduation_date: args.graduation_date,
                    documents: args.documents
                });
                return education.save();
            }
        },

        AddAddress: {
            type: AddressType,
            args: {
                ref_id: { type: new GraphQLNonNull(GraphQLID) },
                street: { type: new GraphQLNonNull(GraphQLString) },
                house_no: { type: new GraphQLNonNull(GraphQLString) },
                city: { type: new GraphQLNonNull(GraphQLString) },
                state: { type: GraphQLString },
                country: { type: new GraphQLNonNull(GraphQLString) },
                postal_code: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve: (parent, args) => {
                let address = new Address({
                    ref_id: args.ref_id,
                    street: args.street,
                    house_no: args.house_no,
                    city: args.city,
                    state: args.state,
                    country: args.country,
                    postal_code: args.postal_code,
                });
                return address.save();
            }
        },

        UpdateAddress: {
            type: AddressType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLID) },
                street: { type: new GraphQLNonNull(GraphQLString) },
                house_no: { type: new GraphQLNonNull(GraphQLString) },
                city: { type: new GraphQLNonNull(GraphQLString) },
                state: { type: GraphQLString },
                country: { type: new GraphQLNonNull(GraphQLString) },
                postal_code: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve: (parent, args) => {
                return Address.findByIdAndUpdate({ '_id': args._id }, {
                    street: args.street,
                    house_no: args.house_no,
                    city: args.city,
                    state: args.state,
                    country: args.country,
                    postal_code: args.postal_code
                });
            }
        },


        AddExperience: {
            type: ExperienceType,
            args: {
                ref_id: { type: new GraphQLNonNull(GraphQLID) },
                employer_name: { type: GraphQLString }
                //employer_address
                //rolls
            },
            resolve: (parent, args) => {
                let experience = new Experience({
                    ref_id: args.ref_id,
                    employer_name: args.employer_name
                });
                return experience.save();
            }
        },

        AddRoll: {
            type: RollType,
            args: {
                ref_id: { type: new GraphQLNonNull(GraphQLID) },
                title: { type: GraphQLString },
                // tasks:
                start_date: { type: GraphQLString },
                end_date: { type: GraphQLString }
            },
            resolve: (parent, args) => {
                let roll = new Roll({
                    ref_id: args.ref_id,
                    title: args.title,
                    start_date: args.start_date,
                    end_date: args.end_date
                });
                return roll.save();
            }
        },

        AddTask: {
            type: TaskType,
            args: {
                ref_id: { type: new GraphQLNonNull(GraphQLID) },
                description: { type: GraphQLString },
            },
            resolve: (parent, args) => {
                let task = new Task({
                    ref_id: args.ref_id,
                    description: args.description,
                });
                return task.save();
            }
        },

        AddSkill: {
            type: LevelType,
            args: {
                ref_id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                level: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve: (parent, args) => {
                console.log(args.ref_id);
                let skill = new Skill({
                    ref_id: args.ref_id,
                    name: args.name,
                    level: args.level
                });
                return skill.save();
            }
        },

        UpdateScale: {
            type: LevelType,
            args: {
                source: { type: new GraphQLNonNull(GraphQLString) },
                _id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                level: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve: (parent, args) => {
                let scale;
                switch(args.source){
                    case 'Languages':
                        scale = Language.findByIdAndUpdate({ '_id': args._id }, {
                            name: args.name,
                            level: args.level
                        });
                        break;
                    case 'Skills':
                        scale = Skill.findByIdAndUpdate({ '_id': args._id }, {
                            name: args.name,
                            level: args.level
                        });
                        break;
                    default:
                }
                return scale;
            }
        },

        AddScale: {
            type: LevelType,
            args: {
                source: { type: new GraphQLNonNull(GraphQLString) },
                ref_id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                level: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve: (parent, args) => {
                let scale;
                switch(args.source){
                    case 'Languages':
                        scale = new Language({
                            ref_id: args.ref_id,
                            name: args.name,
                            level: args.level
                        });
                        break;
                    case 'Skills':
                        scale = new Skill({
                            ref_id: args.ref_id,
                            name: args.name,
                            level: args.level
                        });
                        break;
                    default:
                }
                return scale.save();
            }
        },

        DeleteScale: {
            type: LevelType,
            args: {
                source: { type: new GraphQLNonNull(GraphQLString) },
                _id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: (parent, args) => {
                let scale;
                switch(args.source){
                    case 'Languages':
                        return Language.findByIdAndDelete(args._id);
                    case 'Skills':
                        return Skill.findByIdAndDelete(args._id);
                    default:
                        return null;
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});