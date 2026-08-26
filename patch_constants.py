import json
import re

with open('constants.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Update LAUREL_IMAGES
laurel_images = [
    '/assets/Upperhill, Nairobi/Laurel Hill Suite/Laurel Hill Pictures/L6 Balcony Area.jpg',
    '/assets/Upperhill, Nairobi/Laurel Hill Suite/Laurel Hill Pictures/L6 Bathroom Essentials.jpg',
    '/assets/Upperhill, Nairobi/Laurel Hill Suite/Laurel Hill Pictures/L6 Bedroom (b).jpg',
    '/assets/Upperhill, Nairobi/Laurel Hill Suite/Laurel Hill Pictures/L6 Bedroom (c).jpg',
    '/assets/Upperhill, Nairobi/Laurel Hill Suite/Laurel Hill Pictures/L6 Bedroom (d).jpg',
    '/assets/Upperhill, Nairobi/Laurel Hill Suite/Laurel Hill Pictures/L6 Bedroom .jpg',
    '/assets/Upperhill, Nairobi/Laurel Hill Suite/Laurel Hill Pictures/L6 Bedroom Balcony (b).jpg',
    '/assets/Upperhill, Nairobi/Laurel Hill Suite/Laurel Hill Pictures/L6 Bedroom Balcony.jpg',
    '/assets/Upperhill, Nairobi/Laurel Hill Suite/Laurel Hill Pictures/L6 Bedroom Overview.jpg',
    '/assets/Upperhill, Nairobi/Laurel Hill Suite/Laurel Hill Pictures/L6 Guest Bathroom (b).jpg'
]
content = re.sub(r'export const LAUREL_IMAGES = \[.*?\];', 'export const LAUREL_IMAGES = ' + json.dumps(laurel_images, indent=2) + ';', content, flags=re.DOTALL)

# Update ALBA_IMAGES
alba_images = [
    '/assets/Kilimani, Nairobi/ALBA GARDENS - 2 Bedroom (B1206)/Alba Garden B1206 Pictures/BEDROOM 1/9D5A1976.jpg',
    '/assets/Kilimani, Nairobi/ALBA GARDENS - 2 Bedroom (B1206)/Alba Garden B1206 Pictures/BEDROOM 1/9D5A1983.jpg',
    '/assets/Kilimani, Nairobi/ALBA GARDENS - 2 Bedroom (B1206)/Alba Garden B1206 Pictures/BEDROOM 1/9D5A1992.jpg',
    '/assets/Kilimani, Nairobi/ALBA GARDENS - 2 Bedroom (B1206)/Alba Garden B1206 Pictures/BEDROOM 1/9D5A1998.jpg',
    '/assets/Kilimani, Nairobi/ALBA GARDENS - 2 Bedroom (B1206)/Alba Garden B1206 Pictures/BEDROOM 1/9D5A2006.jpg',
    '/assets/Kilimani, Nairobi/ALBA GARDENS - 2 Bedroom (B1206)/Alba Garden B1206 Pictures/BEDROOM 1/9D5A2076.jpg',
    '/assets/Kilimani, Nairobi/ALBA GARDENS - 2 Bedroom (B1206)/Alba Garden B1206 Pictures/BEDROOM 2/9D5A2019.jpg',
    '/assets/Kilimani, Nairobi/ALBA GARDENS - 2 Bedroom (B1206)/Alba Garden B1206 Pictures/BEDROOM 2/9D5A2022.jpg',
    '/assets/Kilimani, Nairobi/ALBA GARDENS - 2 Bedroom (B1206)/Alba Garden B1206 Pictures/BEDROOM 2/9D5A2029.jpg',
    '/assets/Kilimani, Nairobi/ALBA GARDENS - 2 Bedroom (B1206)/Alba Garden B1206 Pictures/BEDROOM 2/9D5A2033.jpg'
]
content = re.sub(r'export const ALBA_IMAGES = \[.*?\];', 'export const ALBA_IMAGES = ' + json.dumps(alba_images, indent=2) + ';', content, flags=re.DOTALL)

star_root_images = [
    '/assets/Kilimani, Nairobi/STAR ROOT RESIDENCY - 1 Bedroom/Star Root Residency Bathroom 1.jpg',
    '/assets/Kilimani, Nairobi/STAR ROOT RESIDENCY - 1 Bedroom/Star Root Residency Bathroom.jpg',
    '/assets/Kilimani, Nairobi/STAR ROOT RESIDENCY - 1 Bedroom/Star Root Residency Bedroom 1.jpg',
    '/assets/Kilimani, Nairobi/STAR ROOT RESIDENCY - 1 Bedroom/Star Root Residency Bedroom 2.jpg',
    '/assets/Kilimani, Nairobi/STAR ROOT RESIDENCY - 1 Bedroom/Star Root Residency Bedroom.jpg',
    '/assets/Kilimani, Nairobi/STAR ROOT RESIDENCY - 1 Bedroom/Star Root Residency Entrance.jpg',
    '/assets/Kilimani, Nairobi/STAR ROOT RESIDENCY - 1 Bedroom/Star Root Residency Gym.jpg',
    '/assets/Kilimani, Nairobi/STAR ROOT RESIDENCY - 1 Bedroom/Star Root Residency Kid\'s Play Area.jpg',
    '/assets/Kilimani, Nairobi/STAR ROOT RESIDENCY - 1 Bedroom/Star Root Residency Kitchen.jpg',
    '/assets/Kilimani, Nairobi/STAR ROOT RESIDENCY - 1 Bedroom/Star Root Residency Living Room 1.jpg',
    '/assets/Kilimani, Nairobi/STAR ROOT RESIDENCY - 1 Bedroom/Star Root Residency Office Area.jpg',
    '/assets/Kilimani, Nairobi/STAR ROOT RESIDENCY - 1 Bedroom/Star Root Residency Pool Area.jpg'
]

riverside_images = [
    '/assets/Riverside, Nairobi/108 Riverside Apartment/108 Riverside Apartment Pictures/108 Riverside Balcony .jpg',
    '/assets/Riverside, Nairobi/108 Riverside Apartment/108 Riverside Apartment Pictures/108 Riverside Bathroom .jpg',
    '/assets/Riverside, Nairobi/108 Riverside Apartment/108 Riverside Apartment Pictures/108 Riverside Bedroom (1).jpg',
    '/assets/Riverside, Nairobi/108 Riverside Apartment/108 Riverside Apartment Pictures/108 Riverside Bedroom .jpg',
    '/assets/Riverside, Nairobi/108 Riverside Apartment/108 Riverside Apartment Pictures/108 Riverside corridor.jpg',
    '/assets/Riverside, Nairobi/108 Riverside Apartment/108 Riverside Apartment Pictures/108 Riverside Gym.jpg',
    '/assets/Riverside, Nairobi/108 Riverside Apartment/108 Riverside Apartment Pictures/108 Riverside Kitchen (1).jpg',
    '/assets/Riverside, Nairobi/108 Riverside Apartment/108 Riverside Apartment Pictures/108 Riverside Laundry area.jpg',
    '/assets/Riverside, Nairobi/108 Riverside Apartment/108 Riverside Apartment Pictures/108 Riverside Living room (1).jpg',
    '/assets/Riverside, Nairobi/108 Riverside Apartment/108 Riverside Apartment Pictures/108 Riverside Living room (2).jpg',
    '/assets/Riverside, Nairobi/108 Riverside Apartment/108 Riverside Apartment Pictures/108 Riverside Living Room (3).jpg',
    '/assets/Riverside, Nairobi/108 Riverside Apartment/108 Riverside Apartment Pictures/108 Riverside whole building.jpg'
]

appletree_images = [
    '/assets/Syokimau, Nairobi/Apple Tree/Apple Tree Bedroom 1.jpg',
    '/assets/Syokimau, Nairobi/Apple Tree/Apple Tree Bedroom 2.jpg',
    '/assets/Syokimau, Nairobi/Apple Tree/Apple Tree Bedroom 3.jpg',
    '/assets/Syokimau, Nairobi/Apple Tree/Apple Tree Bedroom 5.jpg',
    '/assets/Syokimau, Nairobi/Apple Tree/Apple Tree Bedroom 6.jpg',
    '/assets/Syokimau, Nairobi/Apple Tree/Apple Tree Dining Area.jpg',
    '/assets/Syokimau, Nairobi/Apple Tree/Apple Tree Kitchen.jpg',
    '/assets/Syokimau, Nairobi/Apple Tree/Apple Tree Living Room 1.jpg',
    '/assets/Syokimau, Nairobi/Apple Tree/Apple Tree Living Room 2.jpg',
    '/assets/Syokimau, Nairobi/Apple Tree/Apple Tree Living Room 3.jpg',
    '/assets/Syokimau, Nairobi/Apple Tree/Apple Tree Living Room 4.jpg',
    '/assets/Syokimau, Nairobi/Apple Tree/Apple Tree Living Room.jpg'
]

alba_images_str = 'export const ALBA_IMAGES = ' + json.dumps(alba_images, indent=2) + ';'
new_arrays = "\n\nexport const STAR_ROOT_IMAGES = " + json.dumps(star_root_images, indent=2) + ";\n\nexport const RIVERSIDE_IMAGES = " + json.dumps(riverside_images, indent=2) + ";\n\nexport const APPLETREE_IMAGES = " + json.dumps(appletree_images, indent=2) + ";"

content = content.replace(alba_images_str, alba_images_str + new_arrays)

new_apartments = """,
  {
    id: "star-root",
    name: "Star Root Residency",
    location: "Kilimani",
    bedrooms: 1,
    rentLongTerm: "Price on request",
    rentShortTerm: "Price on request",
    image: "/assets/Kilimani, Nairobi/STAR ROOT RESIDENCY - 1 Bedroom/Star Root Residency Entrance.jpg",
    features: ["Gym", "Pool Area", "Kid's Play Area"],
    images: STAR_ROOT_IMAGES
  },
  {
    id: "riverside-108",
    name: "108 Riverside Apartment",
    location: "Riverside",
    bedrooms: 1,
    rentLongTerm: "Price on request",
    rentShortTerm: "Price on request",
    image: "/assets/Riverside, Nairobi/108 Riverside Apartment/108 Riverside Apartment Pictures/108 Riverside whole building.jpg",
    features: ["Gym", "Balcony", "Laundry area"],
    images: RIVERSIDE_IMAGES
  },
  {
    id: "apple-tree",
    name: "Apple Tree Living",
    location: "Syokimau",
    bedrooms: 6,
    rentLongTerm: "Price on request",
    rentShortTerm: "Price on request",
    image: "/assets/Syokimau, Nairobi/Apple Tree/Apple Tree Living Room 1.jpg",
    features: ["Spacious Living Room", "Dining Area", "Large Kitchen"],
    images: APPLETREE_IMAGES
  }
];"""

match = re.search(r'export const URBAN_APARTMENTS = \[(.*?)\];', content, flags=re.DOTALL)
if match:
    urban_apartments_content = match.group(1)
    urban_apartments_content = urban_apartments_content.rstrip().rstrip(',')
    content = content.replace(match.group(0), 'export const URBAN_APARTMENTS = [' + urban_apartments_content + new_apartments)

# Update LAUREL property image in URBAN_APARTMENTS
content = content.replace('"/assets/Premium%20Locations/L6%20Reception.jpg"', '"/assets/Upperhill, Nairobi/Laurel Hill Suite/Laurel Hill Pictures/L6 Reception.jpg"')

# Update ALBA property image in URBAN_APARTMENTS
content = content.replace('"/assets/Premium%20Locations/A17%20Reception.jpg"', '"/assets/Kilimani, Nairobi/ALBA GARDENS - 2 Bedroom (B1206)/Alba Garden B1206 Pictures/RECEPTION/9D5A1854.jpg"')

# Fix property slug maps
slug_map_addition = """
  starroot: 'star-root-residency',
  riverside108: '108-riverside-apartment',
  appletree: 'apple-tree-living',
"""
content = re.sub(r'alba: \'alba-gardens\',', "alba: 'alba-gardens'," + slug_map_addition, content)


with open('constants.ts', 'w', encoding='utf-8') as f:
    f.write(content)
