import os

birds = ["Common Buzzard", "Mallard", "Mute Swan", "Great Tit", "Red-backed Strike", "Hooded Crow",
         "Rock Pigeon", "Eurasic Blackbird", "Eurasic Kestrel", "Grey Heron", "Common Chaffinch",
         "Black-headed Gull", "Great Cormorant", "White Wagtail", "European Starling", "Eurasian Coot",
         "White Stork", "House Sparrow", "Great Egret", "Eurasian Jay", "Eurasian Magpie", "Rook",
         "Western Marsh Harrier", "Fieldfare", "Commmon Raven", "Eurasian Tree Sparrow"]
#
dir_for_birds = dict()

for bird in birds:
    dir_for_birds[bird] = str(bird).strip().replace(" ", '')

MAIN_DIR = os.getcwd()

# "Rock Pigeon", "Eurasic Blackbird", "Eurasic Kestrel", "Grey Heron", "Common Chaffinch",
# "Black-headed Gull", "Great Cormorant", "White Wagtail", "European Starling", "Eurasian Coot",
# "White Stork", "House Sparrow", "Great Egret", "Eurasian Jay", "Eurasian Magpie", "Rook",
# "Western Marsh Harrier", "Fieldfare", "Commmon Raven", "Eurasian Tree Sparrow"]
