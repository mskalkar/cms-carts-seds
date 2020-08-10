import json
from django.contrib.auth.models import User, Group  # type: ignore
from django.http import HttpResponse  # type: ignore
from django.template.loader import get_template  # type: ignore
from rest_framework import viewsets  # type: ignore
from rest_framework.permissions import (  # type: ignore
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)
from carts.carts_api.serializers import (
    UserSerializer,
    GroupSerializer,
    SectionSerializer,
    SectionBaseSerializer,
    SectionSchemaSerializer,
)
from carts.carts_api.models import (
    Section,
    SectionBase,
    SectionSchema,
)


# TODO: This should be absolutely stored elswhere.
STATE_INFO = {
    "AK": {
        "program_type": "medicaid_exp_chip"
    },
    "AZ": {
        "program_type": "separate_chip"
    },
    "MA": {
        "program_type": "combo"
    },

}


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    permission_classes = [IsAuthenticated]
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class SectionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Section.objects.all()
    serializer_class = SectionSerializer


class SectionBaseViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = SectionBase.objects.all()
    serializer_class = SectionBaseSerializer


class SectionSchemaViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = SectionSchema.objects.all()
    serializer_class = SectionSchemaSerializer


def report(request, year=None, state=None):
    assert year
    assert state
    sections = Section.objects.filter(contents__section__year=year,
                                      contents__section__state=state.upper())
    ordered = sorted([_.contents["section"] for _ in sections],
                     key=lambda s: s["ordinal"])
    context = {
        "sections": ordered,
        "state": STATE_INFO[state.upper()],
        "l": len(ordered)
    }
    report_template = get_template("report.html")
    return HttpResponse(report_template.render(context=context))