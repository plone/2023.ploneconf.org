from zope.interface import provider
from zope.schema.interfaces import IVocabularyFactory
from zope.schema.vocabulary import SimpleTerm
from zope.schema.vocabulary import SimpleVocabulary


LEVELS = [
    ("patron", "Patronage"),
    ("diamond", "Diamond"),
    ("platinum", "Platinum"),
    ("gold", "Gold"),
    ("silver", "Silver"),
    ("bronze", "Bronze"),
    ("supporting", "Supporting"),
    ("oss", "Open Source"),
    ("organizer", "Organized by"),
]


@provider(IVocabularyFactory)
def sponsorship_levels(context):
    """Available Sponsorship Levels."""
    terms = []
    for level_id, level_title in LEVELS:
        terms.append(SimpleTerm(level_id, level_id, level_title))
    return SimpleVocabulary(terms)
