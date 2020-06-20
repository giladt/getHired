const graphql = require('graphql');
const Employer = require('../modules/employer');
const Profile = require('../modules/profile');
const Knows = require('../modules/knows');
const Parts = require('../modules/parts');
const Items = require('../modules/items');
const Resumes = require('../modules/resumes');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID,
  GraphQLBoolean,
  GraphQLSchema
} = graphql;

const LetterType = new GraphQLObjectType({
  name: 'Letter',
  fields: ()=>({
    body: {type: GraphQLString },
    head: {type: GraphQLString },
    phone: {type: GraphQLString },
    email: {type: GraphQLString },
    recipient: {type: GraphQLString }
  })
});

const StatusType = new GraphQLObjectType({
  name: 'Status',
  fields: ()=>({
    sent: {type: GraphQLString },
    pending: {type: GraphQLString },
    interview: {type: GraphQLString },
    rejected: {type: GraphQLString }
  })
});

const EmployerType = new GraphQLObjectType({
  name: 'Employers',
  fields: ()=>({
    id: {type: GraphQLID},
    profile: {
      type: ProfileType,
      resolve(parent){
        return Profile.findById(parent.profile);
      }
    },
    cv: {
      type: ResumesType,
      resolve(parent){
        return Resumes.findById(parent.cv);
      }
    },
    employer_name: {type: GraphQLString},
    website: {type: GraphQLString},
    letter: {type: LetterType},
    status: {type: StatusType}
  })
});

const KnowsType = new GraphQLObjectType({
  name: 'Knows',
  fields: ()=>({
    title: {type: GraphQLString},
    items: {type: GraphQLList(GraphQLString)}
  })
});

const ItemType = new GraphQLObjectType({
  name: 'Item',
  fields: ()=>({
    title: {type: GraphQLString},
    text: {type: GraphQLList(GraphQLString)},

    year: {type: GraphQLString},
    knows: {
      type: GraphQLList(KnowsType),
      resolve() {
        return Knows;
      }
    }
  })
});

const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: ()=>({
    id: {type: GraphQLID},
    fullname: {type: GraphQLString},
    img:  {type: GraphQLString},
    facts: {
      type: new GraphQLObjectType({
        name: 'Fact',
        fields: ()=>({
          title: {type: GraphQLString},
          icon: {type: GraphQLString},
          items: {
            type: GraphQLList(ItemType),
            resolve(parent){
              return parent.items;
            }
          }
        })
      })
    },    
    contact: {
      type: new GraphQLObjectType({
        name: 'Contact',
        fields: ()=>({
          address: {type: new GraphQLObjectType({
            name: 'Address',
            fields: ()=>({
              "street": {type: GraphQLString},
              "house_no": {type: GraphQLString},
              "city": {type: GraphQLString},
              "state": {type: GraphQLString},
              "country": {type: GraphQLString},
              "postal_code": {type: GraphQLInt}
            })
          })},
          phone_land: {
            type: GraphQLList(GraphQLString),
            resolve(parent){
              return parent.phone_land;
            }
          },
          phone_mobile: {
            type: GraphQLList(GraphQLString),
            resolve(parent){
              return parent.phone_mobile;
            }
          },
          email: {
            type: GraphQLList(GraphQLString),
            resolve(parent){
              return parent.email;
            }
          }
        })
      }),
    },
  })
});

const PartItemType = new GraphQLObjectType({
  name: 'PartItem',
  fields: ()=>({
    year: {type: GraphQLString},
    knows: {
      type: GraphQLList(KnowsType),
      resolve(parent) {
        return parent.knows;
      }
    },
    pageBreak: {type: GraphQLString},
    institution: {type: GraphQLString},
    address: {type: GraphQLString},
    tasks: {type: GraphQLList(GraphQLString)},
    role: {type: GraphQLString}
  })
});

const PartsType = new GraphQLObjectType({
  name: 'Parts',
  fields: ()=>({
    id: {type: GraphQLString},
    title: {type: GraphQLString},
    icon: {type: GraphQLString},
    items: {
      type: GraphQLList(PartItemType),
      resolve(parent) {
        return parent.items;
      }
    }
  })
});

const ResumesType = new GraphQLObjectType({
  name: 'Resumes',
  fields: ()=>({
    _id: {type: GraphQLID},
    id: {type: GraphQLID},
    parts: {
      type: new GraphQLList(PartsType),
      resolve(parent) {
        return parent.parts;
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    employers: {
      type: new GraphQLList(EmployerType),
      resolve: ()=>{
        return Employer.find({});
      }
    },
    employer: {
      type: EmployerType,
      args: { id: {type: GraphQLID} },
      resolve: (parent, args)=>{
        return Employer.findById(args.id);
      }
    },

    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: ()=>{
        return Profile.find({});
      }
    },
    profile: {
      type: ProfileType,
      args: { id: {type: GraphQLID} },
      resolve: (parent, args)=>{
        return Profile.findById(args.id);
      }
    },

    resumes: {
      type: new GraphQLList(ResumesType),
      resolve: ()=>{
        return Resumes.find({});
      }
    },
    resume: {
      type: ResumesType,
      args: { _id: {type: GraphQLID} },
      resolve: (parent, args)=>{
        return Resumes.findById(args._id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});