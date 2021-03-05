from chord import Chord


matrix = [[]*51
]

names = ['G_maj', 'D_maj_min7', 'E_min', 'B_maj_min7', 'A_maj_min7', 'D_maj', 'G_maj_maj7', 'Eb_dim', 'B_min_min7', 'G_min', 'C_min', 'F_maj', 'Bb_maj_maj7', 'C_min_min7', 'Bb_maj', 'G_maj_min7', 'G_min_min7', 'Eb_maj_maj7', 'E_maj', 'E_maj_maj7', 'Eb_maj_min7', 'Ab_maj', 'Ab_maj_maj7', 'C_maj_min7', 'F_min', 'Ab_maj_min7', 'C#_maj', 'F_maj_min7', 'Bb_min_min7', 'F#_maj', 'Bb_dim_dim7', 'A_dim_min7', 'Bb_dim', 'F_maj_maj7', 'G_dim', 'F#_dim_min7', 'E_dim_min7', 'A_min_min7', 'C#_min_min7', 'D_dim', 'A_maj_maj7', 'Ab_dim', 'Bb_min', 'F_min_min7', 'C#_dim', 'C_maj', 'D_maj_maj7', 'A_dim_dim7', 'B_dim_dim7', 'Eb_maj', 'B_maj']

Chord(matrix, names).to_html()
