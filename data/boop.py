from chord import Chord

matrix = [
    [0, 22, 24, 32, 6, 57, 24, 40, 20, 4, 69, 14],
    [36, 0, 24, 32, 6, 57, 24, 40, 20, 4, 69, 14],
    [36, 22, 0, 32, 6, 57, 24, 40, 20, 4, 69, 14],
    [36, 22, 24, 0, 6, 57, 24, 40, 20, 4, 69, 14],
    [36, 22, 24, 32, 0, 57, 24, 40, 20, 4, 69, 14],
    [36, 22, 24, 32, 6, 0, 24, 40, 20, 4, 69, 14],
    [36, 22, 24, 32, 6, 57, 0, 40, 20, 4, 69, 14],
    [36, 22, 24, 32, 6, 57, 24, 0, 20, 4, 69, 14],
    [36, 22, 24, 32, 6, 57, 24, 40, 0, 4, 69, 14],
    [36, 22, 24, 32, 6, 57, 24, 40, 20, 0, 69, 14],
    [36, 22, 24, 32, 6, 57, 24, 40, 20, 4, 0, 14],
    [36, 22, 24, 32, 6, 57, 24, 40, 20, 4, 69, 0],
]

chromas = ["A", "A♯", "B", "C", "C♯", "D", "D♯", "E" , "F", "F♯", "G", "G♯"]
colors = ["#43c9b0","#6c8232","#bc813e","#ba4758","#6d80d8","#b2457c", "#56b772","#5b378a", "#b84f36", "#c873c6", "#c7a63b","#82b74e"]

# names = ['G_maj', 'D_maj_min7', 'E_min', 'B_maj_min7', 'A_maj_min7', 'D_maj', 'G_maj_maj7', 'Eb_dim', 'B_min_min7', 'G_min', 'C_min', 'F_maj', 'Bb_maj_maj7', 'C_min_min7', 'Bb_maj', 'G_maj_min7', 'G_min_min7', 'Eb_maj_maj7', 'E_maj', 'E_maj_maj7', 'Eb_maj_min7', 'Ab_maj', 'Ab_maj_maj7', 'C_maj_min7', 'F_min', 'Ab_maj_min7', 'C#_maj', 'F_maj_min7', 'Bb_min_min7', 'F#_maj', 'Bb_dim_dim7', 'A_dim_min7', 'Bb_dim', 'F_maj_maj7', 'G_dim', 'F#_dim_min7', 'E_dim_min7', 'A_min_min7', 'C#_min_min7', 'D_dim', 'A_maj_maj7', 'Ab_dim', 'Bb_min', 'F_min_min7', 'C#_dim', 'C_maj', 'D_maj_maj7', 'A_dim_dim7', 'B_dim_dim7', 'Eb_maj', 'B_maj']
# opacity=0.2
# reverse_gradients=True
# curved_labels=True
Chord(matrix, chromas, colors, opacity=0.2, reverse_gradients=True, curved_labels=True).to_html()
