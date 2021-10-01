import { gql } from '@apollo/client'
import ConferenceFragments from 'features/conference/gql/queries/fragments'
import CommonFragments from 'features/common/fragments'

export const MY_CONFERENCE_QUERY = gql`
  query conferenceById($id: ID!, $isNew: Boolean!) {
    conference(id: $id) @skip(if: $isNew) {
      ...conference
      location {
        ...location
        country {
          ...country
        }
        county {
          ...county
        }
        city {
          ...city
        }
      }
      type {
        ...type
      }
      category {
        ...category
      }
      speakers {
        ...speaker
      }
    }
    typeList {
      id
      name
      code
    }
    categoryList {
      id
      name
      code
    }
    countryList {
      id
      name
      code
    }
    countyList {
      id
      name
      code
    }
    cityList {
      id
      name
      code
    }
  }

  ${ConferenceFragments.conference}
  ${ConferenceFragments.location}
  ${ConferenceFragments.speaker}
  ${CommonFragments.country}
  ${CommonFragments.county}
  ${CommonFragments.city}
  ${CommonFragments.type}
  ${CommonFragments.category}
`
