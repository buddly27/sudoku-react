# :coding: utf-8

from docutils import nodes


def mdn_js_reference(
    name, rawtext, text, lineno, inliner, options=None, content=None
):
    """Return link to a Javascript reference for *text*.

    .. seealso::

        https://developer.mozilla.org/en-US/docs/Web/JavaScript

    *name* should be the role name used in the document.
    *rawtext* should be the entire markup snippet, including the role whilst
    *text* is just the text marked with the role.

    *lineno* should be the line number where rawtext appears in the input.
    *inliner* should be the calling inliner instance.

     *options* should be a mapping of additional options for further
     customisation and *content* a list of additional context that may be
     supplied for customisation.

    Return tuple of list of nodes to insert and list of system messages.

    """
    app = inliner.document.settings.env.app

    reference = (
        "{reference_url}/{id}"
        .format(
            reference_url=app.config.mdn_javascript_reference_url,
            id=text,
        )
    )

    title = text.rsplit("/", 1)[-1]
    node = nodes.reference(rawtext, title, refuri=reference)
    return [node], []


def mdn_html_reference(
    name, rawtext, text, lineno, inliner, options=None, content=None
):
    """Return link to a HTML reference for *text*.

    .. seealso::

        https://developer.mozilla.org/en-US/docs/Web/HTML

    *name* should be the role name used in the document.
    *rawtext* should be the entire markup snippet, including the role whilst
    *text* is just the text marked with the role.

    *lineno* should be the line number where rawtext appears in the input.
    *inliner* should be the calling inliner instance.

     *options* should be a mapping of additional options for further
     customisation and *content* a list of additional context that may be
     supplied for customisation.

    Return tuple of list of nodes to insert and list of system messages.

    """
    app = inliner.document.settings.env.app

    reference = (
        "{reference_url}/{id}"
        .format(
            reference_url=app.config.mdn_html_reference_url,
            id=text,
        )
    )

    title = text.rsplit("/", 1)[-1]
    node = nodes.reference(rawtext, title, refuri=reference)
    return [node], []


def mdn_web_api_reference(
    name, rawtext, text, lineno, inliner, options=None, content=None
):
    """Return link to a Web API reference for *text*.

    .. seealso::

        https://developer.mozilla.org/en-US/docs/Web/API

    *name* should be the role name used in the document.
    *rawtext* should be the entire markup snippet, including the role whilst
    *text* is just the text marked with the role.

    *lineno* should be the line number where rawtext appears in the input.
    *inliner* should be the calling inliner instance.

     *options* should be a mapping of additional options for further
     customisation and *content* a list of additional context that may be
     supplied for customisation.

    Return tuple of list of nodes to insert and list of system messages.

    """
    app = inliner.document.settings.env.app

    reference = (
        "{reference_url}/{id}"
        .format(
            reference_url=app.config.mdn_api_reference_url,
            id=text,
        )
    )

    title = text.rsplit("/", 1)[-1]
    node = nodes.reference(rawtext, title, refuri=reference)
    return [node], []


def setup(app):
    """Install the plugin in the Sphinx *app* context."""
    app.add_role("js-ref", mdn_js_reference)
    app.add_config_value(
        "mdn_javascript_reference_url",
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference",
        "env"
    )

    app.add_role("html-ref", mdn_html_reference)
    app.add_config_value(
        "mdn_html_reference_url",
        "https://developer.mozilla.org/en-US/docs/Web/HTML/Element",
        "env"
    )

    app.add_role("web-api-ref", mdn_web_api_reference)
    app.add_config_value(
        "mdn_api_reference_url",
        "https://developer.mozilla.org/en-US/docs/Web/API",
        "env"
    )

