import re

with open('css/style.css', 'r') as f:
    content = f.read()

# Replace the old animations with a true "flowing/refracting" light effect.
# Instead of just translating, we will use a complex border-radius animation combined with rotation and scale.
# This creates a "blob" or "liquid" light effect that looks like it's constantly shifting and refracting.

new_animations = '''@keyframes glowFlow1 {
    0% { 
        transform: rotate(0deg) scale(1); 
        border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
        opacity: 0.6;
    }
    50% { 
        transform: rotate(180deg) scale(1.2); 
        border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
        opacity: 0.9;
    }
    100% { 
        transform: rotate(360deg) scale(1); 
        border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
        opacity: 0.6;
    }
}

@keyframes glowFlow2 {
    0% { 
        transform: rotate(0deg) scale(1); 
        border-radius:import re

with open('css/style.css', 'r0.