# errors_and_debug.py

from __future__ import annotations
import typing as t
from jinja2.loaders import BaseLoader
from werkzeug.routing import RequestRedirect

from .blueprints import Blueprint
from .globals import request_ctx
from .sansio.app import App

if t.TYPE_CHECKING:
    from .sansio.scaffold import Scaffold
    from .wrappers import Request

class UnexpectedUnicodeError(AssertionError, UnicodeError):
    ...

class DebugFilesKeyError(KeyError, AssertionError):
    ...

class FormDataRoutingRedirect(AssertionError):
    ...

def attach_enctype_error_multidict(request: Request) -> None:
    ...

def _dump_loader_info(loader: BaseLoader) -> t.Iterator[str]:
    ...

def explain_template_loading_attempts(
    app: App,
    template: str,
    attempts: list[
        tuple[
            BaseLoader,
            Scaffold,
            tuple[str, str | None, t.Callable[[], bool] | None] | None,
        ]
    ],
) -> None:
    ...
