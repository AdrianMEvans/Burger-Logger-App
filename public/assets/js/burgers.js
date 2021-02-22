document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
      console.info('DOM loaded');
    }
  
    const changeEatBtns = document.querySelectorAll('.change-eat');
  
    if (changeEatBtns) {
      changeEatBtns.forEach((button) => {
        button.addEventListener('click', (e) => {
          const id = e.target.getAttribute('data-id');
          const newEat = e.target.getAttribute('data-neweat');
  
          const newEatState = {
            sleepy: newEat,
          };
          fetch(`/api/burgers/${id}`, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
  
            body: JSON.stringify(newEatState),
          }).then((response) => {
            if (response.ok) {
              console.log(`changed eat to: ${newEat}`);
              location.reload('/');
            } else {
              alert('something went wrong!');
            }
          });
        });
      });
    }
  
    const createBurgerBtn = document.getElementById('create-form');
  
    if (createBurgerBtn) {
      createBurgerBtn.addEventListener('submit', (e) => {
        e.preventDefault();
  
        const newBurger = {
          name: document.getElementById('ba').value.trim(),
        };
        fetch('/api/burgers', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newBurger),
        }).then(() => {
          document.getElementById('ba').value = '';
          console.log('Created a new Burger!');
          location.reload();
        });
      });
    }
  
    const deleteBurgerBtns = document.querySelectorAll('.delete-burger');
  
    deleteBurgerBtns.forEach((button) => {
      button.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        fetch(`/api/burgers/${id}`, {
          method: 'DELETE',
        }).then((res) => {
          console.log(res);
          console.log(`Deleted burger: ${id}`);
          location.reload();
        });
      });
    });
  });
  