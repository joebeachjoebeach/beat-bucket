import json


def insert_track(cursor, track_dict):
    '''Inserts a track into the database'''
    track_dict['sequence'] = json.dumps(track_dict['sequence'])

    cursor.execute(
        '''
        INSERT INTO tracks (name, base_note, muted, soloed, sequence, project_id)
        VALUES (%(name)s, %(baseNote)s, %(muted)s, %(soloed)s, %(sequence)s, %(project_id)s)
        ''',
        track_dict
    )


def update_track(cursor, track_dict):
    '''Updates a track entry in the database'''
    if 'name' in track_dict:
        cursor.execute(
            '''
            UPDATE tracks
            SET name = %(name)s
            WHERE id = %(id)s
            ''',
            track_dict
        )

    if 'baseNote' in track_dict:
        cursor.execute(
            '''
            UPDATE tracks
            SET base_note = %(baseNote)s
            WHERE id = %(id)s
            ''',
            track_dict
        )

    if 'muted' in track_dict:
        cursor.execute(
            '''
            UPDATE tracks
            SET muted = %(muted)s
            WHERE id = %(id)s
            ''',
            track_dict
        )

    if 'soloed' in track_dict:
        cursor.execute(
            '''
            UPDATE tracks
            SET soloed = %(soloed)s
            WHERE id = %(id)s
            ''',
            track_dict
        )

    if 'sequence' in track_dict:
        track_dict['sequence'] = json.dumps(track_dict['sequence'])
        cursor.execute(
            '''
            UPDATE tracks
            SET sequence = %(sequence)s
            WHERE id = %(id)s
            ''',
            track_dict
        )


def delete_track(cursor, track_id):
    '''Deletes a track'''
    cursor.execute(
        '''
        DELETE FROM tracks
        WHERE id = %s
        ''',
        (track_id,)
    )
