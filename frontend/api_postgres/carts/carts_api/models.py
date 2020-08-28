from django.contrib.postgres.fields import JSONField  # type: ignore
from django.db import models  # type: ignore
import json
import jsonschema  # type: ignore


class SectionSchema(models.Model):
    year = models.IntegerField()
    contents = JSONField()


class SectionBase(models.Model):
    contents = JSONField()

    def clean(self):
        schema_object = SectionSchema.objects.first()
        schema = schema_object.contents
        jsonschema.validate(instance=self.contents, schema=schema)


class Section(models.Model):
    contents = JSONField()

    def clean(self):
        schema_object = SectionSchema.objects.first()
        schema = schema_object.contents
        jsonschema.validate(instance=self.contents, schema=schema)

class Year(models.Model):
    last_modified = models.DateField(auto_now=True, null=True)
    last_modified_by = models.TextField(null=True)
    state = models.CharField(max_length=2)
    status = models.TextField(default="Submitted")
    year = models.IntegerField()