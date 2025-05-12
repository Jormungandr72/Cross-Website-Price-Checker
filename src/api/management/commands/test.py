from django.core.management.base import BaseCommand
from script_standalones.test_api import TestAPI

class Command(BaseCommand):
    help = 'run nexar script which fetches store data'

    def handle(self, *args, **kwargs):
        test = TestAPI()
        test.fetch_stores()

        self.stdout.write(self.style.SUCCESS('Module called successfully'))