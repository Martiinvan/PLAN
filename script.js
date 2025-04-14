document.addEventListener('DOMContentLoaded', () => {
    fetch('workouts.json')
        .then(response => response.json())
        .then(data => {
            const daysContainer = document.getElementById('daysContainer');
            
            data.days.forEach((day, index) => {
                const dayCard = document.createElement('div');
                dayCard.className = 'day-card';
                dayCard.style.animationDelay = `${index * 0.1}s`;
                
                const dayHeader = document.createElement('div');
                dayHeader.className = 'day-header';
                
                const dayTitle = document.createElement('h2');
                dayTitle.className = 'day-title';
                dayTitle.textContent = day.day;
                
                const toggleIcon = document.createElement('span');
                toggleIcon.className = 'toggle-icon';
                toggleIcon.innerHTML = '▼';
                
                dayHeader.appendChild(dayTitle);
                dayHeader.appendChild(toggleIcon);
                
                const dayContent = document.createElement('div');
                dayContent.className = 'day-content';
                
                const exercisesContainer = document.createElement('div');
                exercisesContainer.className = 'exercises-container';
                
                day.exercises.forEach((exercise, exIndex) => {
                    const exerciseDiv = document.createElement('div');
                    exerciseDiv.className = 'exercise';
                    exerciseDiv.style.animationDelay = `${exIndex * 0.1}s`;
                    
                    const exerciseName = document.createElement('h3');
                    exerciseName.className = 'exercise-name';
                    exerciseName.textContent = exercise.name;
                    
                    const sets = document.createElement('p');
                    sets.className = 'sets';
                    sets.textContent = exercise.sets;
                    
                    exerciseDiv.appendChild(exerciseName);
                    exerciseDiv.appendChild(sets);
                    exercisesContainer.appendChild(exerciseDiv);
                });
                
                dayContent.appendChild(exercisesContainer);
                dayCard.appendChild(dayHeader);
                dayCard.appendChild(dayContent);
                daysContainer.appendChild(dayCard);
                
                // Agregar evento de clic para el menú desplegable con animación
                dayHeader.addEventListener('click', () => {
                    const isActive = dayContent.classList.contains('active');
                    dayContent.classList.toggle('active');
                    
                    // Animación del ícono
                    toggleIcon.style.transform = isActive 
                        ? 'rotate(0deg)' 
                        : 'rotate(180deg)';
                    
                    // Animación de los ejercicios
                    const exercises = exercisesContainer.querySelectorAll('.exercise');
                    exercises.forEach((exercise, i) => {
                        if (!isActive) {
                            exercise.style.opacity = '0';
                            exercise.style.transform = 'translateX(-20px)';
                            setTimeout(() => {
                                exercise.style.opacity = '1';
                                exercise.style.transform = 'translateX(0)';
                            }, i * 100);
                        }
                    });
                });
            });
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
            const daysContainer = document.getElementById('daysContainer');
            daysContainer.innerHTML = '<p class="error">Error al cargar el plan de entrenamiento. Por favor, intente más tarde.</p>';
        });
}); 