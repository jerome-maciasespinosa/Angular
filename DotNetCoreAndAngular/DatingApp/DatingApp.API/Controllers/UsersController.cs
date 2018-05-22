using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class UsersController: Controller
    {
        public IDatingRepository _repo { get; set; }
        public IMapper _mapper { get; set; }

        public UsersController (IDatingRepository repo, IMapper mapper) {
            this._repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers(){
            var users = await _repo.GetUsers();
            var usersToREturn = _mapper.Map<IEnumerable<UserForListDto>>(users);
            return Ok(usersToREturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id) {
            var user = await _repo.GetUser(id);
            var userToREturn = _mapper.Map<UserForDetailedDto>(user);
            return Ok(userToREturn);

        }
    }
}