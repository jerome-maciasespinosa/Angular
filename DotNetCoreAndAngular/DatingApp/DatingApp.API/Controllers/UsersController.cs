using System;
using System.Collections.Generic;
using System.Security.Claims;
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

        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id) {
            var user = await _repo.GetUser(id);
            var userToREturn = _mapper.Map<UserForDetailedDto>(user);
            return Ok(userToREturn);

        }
        //aou=/users/1
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserForUpdateDto userForUpdateDto){
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            Models.User userFromRepo = await _repo.GetUser(id);

            if (userFromRepo == null) 
                return NotFound($"Could not find user with an id of {id}");

            if (currentUserId != userFromRepo.Id) 
                return Unauthorized();

            _mapper.Map(userForUpdateDto, userFromRepo);

            if (await _repo.SaveAll())
            return NoContent();

            throw new Exception($"Updating user {id} failed on save");

        }
    }
}