# LA Metro Alexa Skill

## Roadmap

- "When is the next train to {destination} from {stop}"
  - The next train [to XXXXX] is in X minutes; the next train [to YYYYY] is in Y minutes.
  - bonus
	  - it will take you X minutes to walk there (geolocate)
	  - @see https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/device-address-api

- "What is my closest stop?"
  - Geolocation of user
  - Compare stop lat/long to user geo
  - Response: "your closest stop is ____ on the ____ line" (maybe multiple)
  - Dialog: "When is the next train there?"

- "How do I get to [stop name]"
  - Respond with some information, "should I text it to you?"
	- Text message to user's phone:
  - Respond with a card in the alexa app w/interactivity
