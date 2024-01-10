export interface PresetTheme {
  name: string,
  description: string,
  angles: { name: string, description: string }[]
}

export const themes: PresetTheme[] = [
  {
    "name": "Convenience",
    "description": "This product makes life easier",
    "angles": [
      {
        "name": "Comfort",
        "description": "This product makes what I'm doing a lot more comfortable."
      },
      {
        "name": "Saves time",
        "description": "This product helps me do things faster."
      },
      {
        "name": "Streamlines life",
        "description": "This product makes my life smoother."
      }
    ]
  },
  {
    "name": "Ease of use",
    "description": "This product is simple to understand and do",
    "angles": [
      {
        "name": "It’s easy",
        "description": "This product is easy to use."
      },
      {
        "name": "Simple / Straightforward",
        "description": "This product is simple to understand."
      },
      {
        "name": "Familiar",
        "description": "This product doesn’t require learning new things."
      }
    ]
  },
  {
    "name": "Efficacy",
    "description": "This product is good at what it does",
    "angles": [
      {
        "name": "Good at what it does",
        "description": "This product does its job well."
      },
      {
        "name": "Made for a single purpose",
        "description": "This product is not trying to do too much."
      },
      {
        "name": "Quality",
        "description": "The quality of this product sets it apart from the rest."
      }
    ]
  },
  {
    "name": "Value",
    "description": "This product gives you more bang for your buck",
    "angles": [
      {
        "name": "More bang for your buck",
        "description": "This product gives me a lot for little money."
      },
      {
        "name": "Inexpensive alternative",
        "description": "This product is a more affordable option."
      },
      {
        "name": "Save your money",
        "description": "This product costs less, so I can use my money on other things."
      }
    ]
  },
  {
    "name": "Sustainability",
    "description": "This product is an eco-friendly alternative",
    "angles": [
      {
        "name": "Eco-friendly alternative",
        "description": "This product is an eco-friendly alternative."
      },
      {
        "name": "Saves precious resources",
        "description": "This product doesn't put a strain on resources."
      },
      {
        "name": "Less waste",
        "description": "This product creates less waste."
      }
    ]
  },
  {
    "name": "Authenticity",
    "description": "This product understands you and your needs",
    "angles": [
      {
        "name": "Knows who you are",
        "description": "This product really understands who you are."
      },
      {
        "name": "Knows what your problems are",
        "description": "This product really understands your challenges."
      },
      {
        "name": "Knows how to solve your problems",
        "description": "This product really understands what you need."
      }
    ]
  },
  {
    "name": "Authority",
    "description": "This product is made by experts",
    "angles": [
      {
        "name": "Trust",
        "description": "This product is highly trustworthy because it was made by experts."
      },
      {
        "name": "Expertise",
        "description": "This product was created by experts in the field."
      },
      {
        "name": "Experiences",
        "description": "This product was created after years of personal experience."
      }
    ]
  }
]
