"""
TESTS is a dict with all of your tests.
Keys for this will be the categories' names.
Each test is a dict with
    "input" -- input data for a user function
    "answer" -- your right answer
    "explanation" -- not necessarily a key, it's used for an additional info in animation.
"""


TESTS = {
    "Basics": [
        {
            "input": "fflff",
            "answer": [-1, 4]
        },
        {
            "input": "ffrff",
            "answer": [1, 4]
        },
        {
            "input": "fblr",
            "answer": [0, 0]
        }
    ],
    "Extra": [
        {
            "input": "ffff",
            "answer": [0, 4]
        },
        {
            "input": "ffbbffbb",
            "answer": [0, 0]
        },
        {
            "input": "frfr",
            "answer": [2, 2]
        }
    ]
}
