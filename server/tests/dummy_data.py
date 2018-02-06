def generate_temp_project():
    return {
        'bpm': 120,
        'name': 'My New Project',
        'shared': False,
        'tracks': [
            {
                'name': 'Track 1',
                'baseNote': 1,
                'muted': False,
                'soloed': False,
                'sequence': [['C4'], ['D4', 'E4'], ['F4'], ['G4', 'G4', 'G4']],
                'volume': 0,
                'nextId': 100
            },
            {
                'name': 'Track 2',
                'baseNote': 2,
                'muted': True,
                'soloed': False,
                'sequence': [['C4', 'G4']],
                'volume': 0,
                'nextId': 20
            }
        ]
    }
