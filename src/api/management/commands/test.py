from django.core.management.base import BaseCommand, CommandError

class Command(BaseCommand):
    """ Test manage.py command """
    help = 'Test manage.py command'

    def handle(self, *args, **options):
        """ Handle the command """
        self.stdout.write(self.style.SUCCESS('Test manage.py command executed successfully!'))
        # this is where you would write fetch code, or call another function
