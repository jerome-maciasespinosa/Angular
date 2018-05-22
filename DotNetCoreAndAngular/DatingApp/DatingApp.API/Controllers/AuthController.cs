using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    public class AuthController: Controller
    {
        public IAuthRepository _repo { get; set; }
        public IConfiguration _config { get; set; }
        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            _repo = repo;
            _config = config;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]UserForRegisterDto userForRegisterDto)
        {
            //Validate request
            if(!string.IsNullOrEmpty(userForRegisterDto.Username)){
                userForRegisterDto.Username = userForRegisterDto.Username.ToLower();
            }

            if(await _repo.UserExists(userForRegisterDto.Username)){
                ModelState.AddModelError("Username", "Username already exists");
            }

            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            var userTocreate = new User {
                Username = userForRegisterDto.Username
            };
            var createUser = await _repo.Register(userTocreate, userForRegisterDto.Password);

            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserForLoginDto userForLogindto) {

            // throw new Exception("computer says no!");
            var userFromRepo = await _repo.Login(userForLogindto.Username.ToLower(), userForLogindto.Password);
            if (userFromRepo == null) {
                return Unauthorized();
            }

            //token generation
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config.GetSection("AppSettings:Token").Value);
            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity( new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                    new Claim(ClaimTypes.Name, userFromRepo.Username)
                }),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha512Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Ok(new {tokenString});
        }
    }
}