from xenopy import Query

# birds = ["Common Buzzard", "Mallard", "Mute Swan", "Great Tit", "Red-backed Strike", "Hooded Crow",
#          "Rock Pigeon", "Eurasic Blackbird", "Eurasic Kestrel", "Grey Heron", "Common Chaffinch",
#          "Black-headed Gull", "Great Cormorant", "White Wagtail", "European Starling", "Eurasian Coot",
#          "White Stork", "House Sparrow", "Great Egret", "Eurasian Jay", "Eurasian Magpie", "Rook",
#          "Western Marsh Harrier", "Fieldfare", "Commmon Raven", "Eurasian Tree Sparrow"]

# birds = ["House Sparrow"]
# "Rock Pigeon", "Eurasic Blackbird", "Eurasic Kestrel", "Grey Heron", "Common Chaffinch",
# "Black-headed Gull", "Great Cormorant", "White Wagtail", "European Starling", "Eurasian Coot",
# "White Stork", "House Sparrow", "Great Egret", "Eurasian Jay", "Eurasian Magpie", "Rook",
# "Western Marsh Harrier", "Fieldfare", "Commmon Raven", "Eurasian Tree Sparrow"]


def download_sounds(birds):
    for bird_name in birds:
        q = Query(name=bird_name, q_gt="B", since="2023-06-01")
        # print(metafiles['recordings'])
        q.retrieve_recordings(multiprocess=True, nproc=5, attempts=5, outdir=f"sounds/{bird_name}")


if __name__ == "__main__":
    pass
