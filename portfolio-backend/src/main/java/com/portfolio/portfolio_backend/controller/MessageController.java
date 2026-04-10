// package com.portfolio.portfolio_backend.controller;

// import com.portfolio.portfolio_backend.model.Message;
// import com.portfolio.portfolio_backend.repository.MessageRepository;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;
// import java.util.Map;

// @RestController
// @RequestMapping("/api/messages")
// @CrossOrigin(origins = "http://localhost:5173")
// public class MessageController {

//     private final MessageRepository messageRepository;

//     public MessageController(MessageRepository messageRepository) {
//         this.messageRepository = messageRepository;
//     }

//     @PostMapping
//     public ResponseEntity<?> createMessage(@RequestBody Message payload) {
//         if (payload.getName() == null || payload.getName().trim().isEmpty()) {
//             return ResponseEntity.badRequest().body("Name is required");
//         }
//         if (payload.getEmail() == null || payload.getEmail().trim().isEmpty()) {
//             return ResponseEntity.badRequest().body("Email is required");
//         }
//         if (payload.getMessage() == null || payload.getMessage().trim().isEmpty()) {
//             return ResponseEntity.badRequest().body("Message is required");
//         }

//         Message message = new Message();
//         message.setName(payload.getName().trim());
//         message.setEmail(payload.getEmail().trim());
//         message.setMessage(payload.getMessage().trim());
//         message.setRead(false);

//         return ResponseEntity.ok(messageRepository.save(message));
//     }

//     @GetMapping
//     public ResponseEntity<List<Message>> getMessages() {
//         return ResponseEntity.ok(messageRepository.findAllByOrderByCreatedAtDesc());
//     }

//     @GetMapping("/unread-count")
//     public ResponseEntity<Map<String, Long>> getUnreadCount() {
//         long count = messageRepository.countByIsReadFalse();
//         return ResponseEntity.ok(Map.of("count", count));
//     }

//     @PutMapping("/{id}/read")
//     public ResponseEntity<?> markAsRead(@PathVariable Long id) {
//         return messageRepository.findById(id)
//                 .map(message -> {
//                     message.setRead(true);
//                     messageRepository.save(message);
//                     return ResponseEntity.ok(message);
//                 })
//                 .orElseGet(() -> ResponseEntity.notFound().build());
//     }

//     @PutMapping("/read-all")
//     public ResponseEntity<?> markAllAsRead() {
//         List<Message> messages = messageRepository.findAll();
//         for (Message message : messages) {
//             message.setRead(true);
//         }
//         messageRepository.saveAll(messages);
//         return ResponseEntity.ok(Map.of("message", "All messages marked as read"));
//     }
// }
