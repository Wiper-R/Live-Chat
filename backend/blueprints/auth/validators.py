import string, re

EMAIL_REGEX = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b"


def validate_is_strong_password(passw: str):
    # has_uppercase = False
    # has_lowercase = False
    # has_digits = False
    # has_alphabets = False
    # has_special_characters = False

    # if len(passw) < 8:
    #     return False

    # for c in passw:
    #     if c in string.ascii_lowercase:
    #         has_lowercase = True
    #     elif c in string.ascii_uppercase:
    #         has_uppercase = True
    #     elif c in string.digits:
    #         has_digits = True

    #     if c in string.ascii_letters:
    #         has_alphabets = True

    #     if c not in string.ascii_letters + string.digits:
    #         has_special_characters = True

    # if not has_lowercase:
    #     return "Password should contain lowercase letters."

    # if not has_uppercase:
    #     return "Password should contain uppercase letters."

    return True


def validate_email(emailstr: str) -> bool:
    return re.fullmatch(EMAIL_REGEX, emailstr)
